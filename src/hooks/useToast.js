import { useEffect, useRef, useState } from 'react';

const TOAST_DURATION = 2600;

export function useToast() {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function showToast(text) {
    setMessage(text);
    setIsVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(false), TOAST_DURATION);
  }

  return { message, isVisible, showToast };
}
