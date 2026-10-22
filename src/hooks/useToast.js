import { useEffect, useRef, useState } from 'react';

const TOAST_DURATION = 2600;
// Com uma ação ("Ver carrinho") o aviso fica mais tempo, para dar tempo de alcançá-la.
const ACTION_TOAST_DURATION = 6000;

/*
  Um aviso por vez: um novo substitui o atual e reinicia o tempo, sem empilhar. variant escolhe o
  ícone ('info', 'success' ou 'warning'). O tempo pausa com hover ou foco no aviso e continua de
  onde parou ao sair.
*/
export function useToast() {
  const [toast, setToast] = useState({ message: '', variant: 'info', action: null });
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef();
  const remainingRef = useRef(0);
  const startedAtRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function startTimer(duration) {
    clearTimeout(timerRef.current);
    remainingRef.current = duration;
    startedAtRef.current = Date.now();
    if (!isPausedRef.current) timerRef.current = setTimeout(() => setIsVisible(false), duration);
  }

  function showToast(message, { variant = 'info', action = null } = {}) {
    setToast({ message, variant, action });
    setIsVisible(true);
    startTimer(action ? ACTION_TOAST_DURATION : TOAST_DURATION);
  }

  function dismissToast() {
    clearTimeout(timerRef.current);
    setIsVisible(false);
  }

  function pauseToast() {
    if (isPausedRef.current) return;
    isPausedRef.current = true;
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - startedAtRef.current;
  }

  function resumeToast() {
    if (!isPausedRef.current) return;
    isPausedRef.current = false;
    startTimer(Math.max(remainingRef.current, 0));
  }

  return { ...toast, isVisible, showToast, dismissToast, pauseToast, resumeToast };
}
