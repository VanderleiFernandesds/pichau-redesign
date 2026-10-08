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
  const movedCount = current.order.indexOf(targetId);
  return { order: rotate(current.order, movedCount), phase: 'expanded', targetId, shownId: targetId, movedCount, isQuick: false };
}

/*
  Fila de slides: só o primeiro expande. Ao fim da leitura a troca passa por etapas, cada uma com
  a duração da transição do CSS:
    concealing  os objetos do primeiro somem, com o card ainda aberto
    collapsing  o primeiro recolhe e recupera a borda
    leaving     quem vai para o final some no lugar (assim não cruza por cima dos outros)
    shifting    a fila gira: os demais andam para a esquerda e quem saiu vai, invisível, para o final
    entering    quem saiu reaparece no final e os objetos do novo primeiro somem
    expanded    o novo primeiro expande e fica pelo tempo de leitura
  Na primeira expansão, preparing faz o papel de entering. Os objetos nunca são vistos mudando de
  posição: trocam de lugar enquanto estão invisíveis e reaparecem com o card já aberto ou fechado.
  Na seleção manual não há etapas: a fila pula direto para o escolhido na frente (jumping, com as
  transições desligadas no CSS) e só a expansão dele é animada.
  Só a espera inicial e a leitura respeitam a pausa; uma troca já iniciada termina e para no
  slide expandido, para nunca ficar presa no meio.
*/
export function useHeroCarousel(slideIds, { startDelay, readingTime, transitionTime, selectTransitionTime }) {
  const [isReducedMotion, setIsReducedMotion] = useState(getPrefersReducedMotion);
  // Com movimento reduzido não há avanço automático: o primeiro slide já começa aberto.
  const [cycle, setCycle] = useState(() => ({
    order: slideIds,
    phase: isReducedMotion ? 'expanded' : 'intro',
    targetId: slideIds[0],
    shownId: slideIds[0],
    movedCount: 0,
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

  // Seleção manual: reordena a fila de uma vez, de qualquer etapa, com o escolhido na frente.
  // isQuick deixa a expansão dele (e a troca do texto) com a duração curta da seleção.
  // previousId é quem estava na frente: ele fecha de uma vez e os objetos dele precisam sumir junto.
  function jumpTo(current, targetId) {
    const movedCount = current.order.indexOf(targetId);
    return { ...current, order: rotate(current.order, movedCount), phase: 'jumping', targetId, movedCount, isQuick: true, previousId: current.order[0] };
  }

  function nextStep(current) {
    switch (current.phase) {
      case 'intro':
        return { ...current, phase: 'preparing' };
      case 'preparing':
        return { ...current, phase: 'expanded' };
      case 'concealing':
        return { ...current, phase: 'collapsing' };
      case 'expanded':
        return startRotation(current, current.order[1]);
      case 'collapsing':
        return { ...current, phase: 'leaving' };
      case 'leaving': {
        const movedCount = current.order.indexOf(current.targetId);
        return { ...current, order: rotate(current.order, movedCount), phase: 'shifting', movedCount };
      }
      case 'shifting':
        return { ...current, phase: 'entering' };
      case 'jumping':
        return { ...current, phase: 'expanded', shownId: current.targetId };
      default:
        // Uma seleção feita no meio da troca pode pedir outra volta antes de expandir.
        return current.order[0] === current.targetId
          ? { ...current, phase: 'expanded', shownId: current.targetId }
          : { ...current, phase: 'collapsing' };
    }
  }

  const isWaiting = cycle.phase === 'intro' || cycle.phase === 'expanded';
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
    if (isWaiting && !isRunning) return undefined;

    let delay = cycle.isQuick ? selectTransitionTime : transitionTime;
    if (cycle.phase === 'jumping') delay = JUMP_FRAME_DELAY;
    else if (cycle.phase === 'intro') delay = startDelay;
    else if (isReading) delay = readingTime - readingElapsedRef.current;

    const startedAt = performance.now();
    const timer = setTimeout(() => setCycle(nextStep), delay);
    return () => {
      clearTimeout(timer);
      if (isReading) readingElapsedRef.current += performance.now() - startedAt;
    };
    // Um único timer por etapa, limpo a cada mudança, evita ciclos duplicados.
  }, [cycle, isWaiting, isReading, isPlaying, isRunning, isReducedMotion, startDelay, readingTime, transitionTime, selectTransitionTime]);

  // Escolher outro slide pausa; clicar no que já está aberto não faz nada (pausar é só no botão).
  function select(slideId) {
    const isAlreadyOpen = cycle.phase === 'expanded' && cycle.order[0] === slideId;
    if (isAlreadyOpen) return;

    setIsPlaying(false);
    setCycle((current) => jumpTo(current, slideId));
  }

  function togglePlaying() {
    if (isPlaying) {
      setIsPlaying(false);
      // Pausar na espera inicial abre o primeiro slide, passando pela etapa que esconde os objetos.
      setCycle((current) => (current.phase === 'intro' ? { ...current, phase: 'preparing' } : current));
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
    onFocus: () => setIsFocused(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
    },
  };

  let hiddenIds = [];
  if (cycle.phase === 'leaving') hiddenIds = cycle.order.slice(0, cycle.order.indexOf(cycle.targetId));
  else if (cycle.phase === 'shifting') hiddenIds = cycle.order.slice(cycle.order.length - cycle.movedCount);

  // Cards com os objetos escondidos: o da frente antes de expandir ou recolher, e quem está indo
  // para o final, que só mostra os objetos de novo ao reaparecer já fechado.
  const isFrontConcealed = ['preparing', 'entering', 'concealing', 'collapsing'].includes(cycle.phase);
  let objectsHiddenIds = isFrontConcealed ? [cycle.order[0]] : hiddenIds;
  if (cycle.phase === 'jumping') objectsHiddenIds = [cycle.order[0], cycle.previousId];

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
    hiddenIds,
    objectsHiddenIds,
    isPlaying,
    isRunning,
    select,
    togglePlaying,
    pauseHandlers,
  };
}
