export default function Toast({ message, isVisible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-[calc(25px+var(--mobile-nav-space))] left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-md border border-line bg-surface px-6 py-[15px] text-[13px] text-white transition-all duration-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[25px] opacity-0'
      }`}
    >
      {message}
    </div>
  );
}
