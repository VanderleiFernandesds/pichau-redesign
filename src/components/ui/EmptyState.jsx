export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-10 text-center">
      <h3 className="my-[1em] font-display text-[1.3em] font-bold">{title}</h3>
      <p className="my-[1em]">{description}</p>
      {action}
    </div>
  );
}
