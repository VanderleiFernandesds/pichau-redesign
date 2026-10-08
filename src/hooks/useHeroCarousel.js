import { useEffect, useState } from 'react';

function getPrefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Tempo para o navegador pintar a fila já reordenada, sem transições, antes de expandir o novo primeiro.
const JUMP_FRAME_DELAY = 40;

// Leva os `count` primeiros da fila para o final, mantendo a ordem relativa.
function rotate(order, count) {
  return [...order.slice(count), ...order.slice(0, count)];
}

/*
  Fila de slides: só o primeiro expande. Ao fim da leitura a troca passa por etapas, cada uma com
  a duração da transição do CSS:
    collapsing  o primeiro recolhe e recupera a borda
    leaving     quem vai para o final some no lugar (assim não cruza por cima dos outros)
    shifting    a fila gira: os demais andam para a esquerda e quem saiu vai, invisível, para o final
    entering    quem saiu reaparece no final
    expanded    o novo primeiro expande e fica pelo tempo de leitura
  Na seleção manual não há etapas: a fila pula direto para o escolhido na frente (jumping, com as
  transições desligadas no CSS) e só a expansão dele é animada.
  Só a espera inicial e a leitura respeitam a pausa; uma troca já iniciada termina e para no
  slide expandido, para nunca ficar presa no meio.
*/
export function useHeroCarousel(slideIds, { startDelay, readingTime, transitionTime, selectTransitionTime }) {
  const [isReducedMotion] = useState(getPrefersReducedMotion);
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

  // Sem animação (movimento reduzido) a fila gira direto, sem as etapas intermediárias.
  function startRotation(current, targetId) {
    if (!isReducedMotion) return { ...current, phase: 'collapsing', targetId, isQuick: false };

    const movedCount = current.order.indexOf(targetId);
    return { order: rotate(current.order, movedCount), phase: 'expanded', targetId, shownId: targetId, movedCount, isQuick: false };
  }

  // Seleção manual: reordena a fila de uma vez, de qualquer etapa, com o escolhido na frente.
  // isQuick deixa a expansão dele (e a troca do texto) com a duração curta da seleção.
  function jumpTo(current, targetId) {
    const movedCount = current.order.indexOf(targetId);
    return { ...current, order: rotate(current.order, movedCount), phase: 'jumping', targetId, movedCount, isQuick: true };
  }

  function nextStep(current) {
    switch (current.phase) {
      case 'intro':
        return { ...current, phase: 'expanded' };
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

  useEffect(() => {
    if (isWaiting && !isRunning) return undefined;

    let delay = cycle.isQuick ? selectTransitionTime : transitionTime;
    if (cycle.phase === 'jumping') delay = JUMP_FRAME_DELAY;
    else if (cycle.phase === 'intro') delay = startDelay;
    else if (cycle.phase === 'expanded') delay = readingTime;

    const timer = setTimeout(() => setCycle(nextStep), delay);
    return () => clearTimeout(timer);
    // Um único timer por etapa, limpo a cada mudança, evita ciclos duplicados.
  }, [cycle, isWaiting, isRunning, startDelay, readingTime, transitionTime, selectTransitionTime]);

  function select(slideId) {
    setIsPlaying(false);
    setCycle((current) => {
      const isAlreadyOpen = current.phase === 'expanded' && current.order[0] === slideId;
      return isAlreadyOpen ? current : jumpTo(current, slideId);
    });
  }

  function togglePlaying() {
    if (isPlaying) {
      setIsPlaying(false);
      setCycle((current) => (current.phase === 'intro' ? { ...current, phase: 'expanded' } : current));
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

  return {
    order: cycle.order,
    shownId: cycle.shownId,
    isExpanded: cycle.phase === 'expanded',
    isJumping: cycle.phase === 'jumping',
    // A duração vai para o CSS, para as animações acompanharem o ritmo das etapas.
    transitionTime: cycle.isQuick ? selectTransitionTime : transitionTime,
    hiddenIds,
    isPlaying,
    isRunning,
    select,
    togglePlaying,
    pauseHandlers,
  };
}
