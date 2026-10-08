import { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function getPrefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Tempo para o navegador pintar a fila já reordenada, sem transições, antes de expandir o novo primeiro.
const JUMP_FRAME_DELAY = 40;

// Leva os `count` primeiros da fila para o final, mantendo a ordem relativa.
function rotate(order, count) {
  return [...order.slice(count), ...order.slice(0, count)];
}

// Termina a troca na hora, com o alvo na frente e expandido (usado sem animação).
function settleOn(current, targetId) {
  return { order: rotate(current.order, current.order.indexOf(targetId)), phase: 'expanded', targetId, shownId: targetId, isQuick: false };
}

/*
  Fila de slides: só o primeiro expande, e o primeiro slide já começa aberto. Etapas:
    expanded    o primeiro fica aberto pelo tempo de leitura
    concealing  (só no automático) os objetos do aberto e do próximo somem, com o card ainda aberto
    jumping     a fila pula de uma vez para o escolhido na frente, com as transições desligadas no
                CSS: o card que estava aberto fecha sem animação e vai para o final
  Depois do jumping, só a expansão do novo primeiro é animada. Os objetos nunca são vistos mudando
  de posição: trocam de lugar enquanto estão invisíveis e reaparecem com o card já aberto ou fechado.
  Só a leitura respeita a pausa; uma troca já iniciada termina e para no slide expandido, para
  nunca ficar presa no meio.
*/
export function useHeroCarousel(slideIds, { readingTime, transitionTime, selectTransitionTime }) {
  const [isReducedMotion, setIsReducedMotion] = useState(getPrefersReducedMotion);
  // Com movimento reduzido não há avanço automático.
  const [cycle, setCycle] = useState(() => ({
    order: slideIds,
    phase: 'expanded',
    targetId: slideIds[0],
    shownId: slideIds[0],
    isQuick: false,
  }));
  const [isPlaying, setIsPlaying] = useState(!isReducedMotion);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(() => document.hidden);

  const isRunning = isPlaying && !isHovered && !isFocused && !isPageHidden;

  useEffect(() => {
    function handleVisibilityChange() {
      setIsPageHidden(document.hidden);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Ativar o movimento reduzido com a página aberta tem o mesmo efeito do carregamento: a troca em
  // andamento termina na hora e o avanço automático para. Desativar não retoma sozinho.
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);

    function handleChange() {
      setIsReducedMotion(query.matches);
      if (!query.matches) return;
      setIsPlaying(false);
      setCycle((current) => (current.phase === 'expanded' ? current : settleOn(current, current.targetId)));
    }

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Sem animação (movimento reduzido) a fila gira direto, sem as etapas intermediárias.
  function startRotation(current, targetId) {
    return isReducedMotion ? settleOn(current, targetId) : { ...current, phase: 'concealing', targetId, isQuick: false };
  }

  // Reordena a fila de uma vez, de qualquer etapa, com o escolhido na frente. Na seleção manual,
  // isQuick deixa a expansão dele (e a troca do texto) com a duração curta da seleção.
  // previousId é quem estava na frente: ele fecha de uma vez e os objetos dele precisam sumir junto.
  function jumpTo(current, targetId, isQuick) {
    const order = rotate(current.order, current.order.indexOf(targetId));
    return { ...current, order, phase: 'jumping', targetId, isQuick, previousId: current.order[0] };
  }

  function nextStep(current) {
    switch (current.phase) {
      case 'expanded':
        return startRotation(current, current.order[1]);
      case 'concealing':
        return jumpTo(current, current.targetId, false);
      default:
        return { ...current, phase: 'expanded', shownId: current.targetId };
    }
  }

  const isReading = cycle.phase === 'expanded';

  /*
    Tempo de leitura já cumprido no slide atual. Pausas passageiras (hover, foco, aba oculta)
    retomam de onde pararam, como a barra de progresso do indicador, que só congela. Um novo
    slide ou a pausa pelo botão zeram: ao dar play, a leitura recomeça junto com a barra.
  */
  const readingElapsedRef = useRef(0);
  const timedCycleRef = useRef(cycle);

  useEffect(() => {
    if (timedCycleRef.current !== cycle || !isPlaying) {
      readingElapsedRef.current = 0;
      timedCycleRef.current = cycle;
    }
    if (isReading && !isRunning) return undefined;

    let delay = cycle.isQuick ? selectTransitionTime : transitionTime;
    if (cycle.phase === 'jumping') delay = JUMP_FRAME_DELAY;
    else if (isReading) delay = readingTime - readingElapsedRef.current;

    const startedAt = performance.now();
    const timer = setTimeout(() => setCycle(nextStep), delay);
    return () => {
      clearTimeout(timer);
      if (isReading) readingElapsedRef.current += performance.now() - startedAt;
    };
    // Um único timer por etapa, limpo a cada mudança, evita ciclos duplicados.
  }, [cycle, isReading, isPlaying, isRunning, isReducedMotion, readingTime, transitionTime, selectTransitionTime]);

  // Navegar não pausa: o automático segue a partir do escolhido, com a leitura recomeçando.
  // Pausar é só no botão; clicar no slide que já está aberto não faz nada.
  function select(slideId) {
    const isAlreadyOpen = cycle.phase === 'expanded' && cycle.order[0] === slideId;
    if (isAlreadyOpen) return;

    setCycle((current) => jumpTo(current, slideId, true));
  }

  function togglePlaying() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    // Retomar é uma ação explícita: não espera o ponteiro ou o foco saírem do carrossel.
    setIsHovered(false);
    setIsFocused(false);
    setIsPlaying(true);
  }

  const pauseHandlers = {
    // Só mouse: no toque, pointerenter dispararia a cada tap e o ciclo pausaria sem motivo.
    onPointerEnter: (event) => event.pointerType === 'mouse' && setIsHovered(true),
    onPointerLeave: () => setIsHovered(false),
    // Só foco de teclado: no toque e no clique o botão também recebe foco, e o carrossel ficaria
    // pausado até o foco sair dele.
    onFocus: (event) => event.target.matches(':focus-visible') && setIsFocused(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
    },
  };

  // Cards com os objetos escondidos: o aberto e o próximo antes do pulo, e no pulo o novo primeiro
  // e quem fechou, que mostra os objetos de novo já fechado.
  let objectsHiddenIds = [];
  if (cycle.phase === 'concealing') objectsHiddenIds = [cycle.order[0], cycle.targetId];
  else if (cycle.phase === 'jumping') objectsHiddenIds = [cycle.order[0], cycle.previousId];

  return {
    order: cycle.order,
    shownId: cycle.shownId,
    // Em concealing o card continua aberto; só os objetos estão saindo.
    isExpanded: cycle.phase === 'expanded' || cycle.phase === 'concealing',
    isJumping: cycle.phase === 'jumping',
    isReading,
    readingTime,
    // A duração vai para o CSS, para as animações acompanharem o ritmo das etapas.
    transitionTime: cycle.isQuick ? selectTransitionTime : transitionTime,
    objectsHiddenIds,
    isPlaying,
    isRunning,
    select,
    togglePlaying,
    pauseHandlers,
  };
}
