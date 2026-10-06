// localStorage pode estar bloqueado (modo privado, cota cheia) ou conter JSON inválido.
export function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sem persistência o app continua funcionando apenas em memória.
  }
}
