import { CATEGORY_SHORTCUTS } from '../../data/categories';

export default function Categories({ onFilter }) {
  return (
    <section
      aria-label="Categorias"
      className="mt-3.5 mb-7 flex justify-start gap-[18px] overflow-auto rounded-[5px] bg-[#f5f6f8] px-2.5 py-[17px] sm:mb-11 sm:justify-between sm:gap-0 sm:overflow-visible sm:py-[18px]"
    >
      {CATEGORY_SHORTCUTS.map(({ label, category, icon: Icon }) => (
        <button
          key={category}
          type="button"
          onClick={() => onFilter(category)}
          className="inline-flex items-center gap-1.5 border-r border-[#dde0e5] px-3 text-[11px] whitespace-nowrap last:border-0 hover:text-brand sm:px-2.5 sm:text-[13px] sm:whitespace-normal lg:px-5"
        >
          <Icon aria-hidden="true" className="size-3.5 sm:size-4" />
          {label}
        </button>
      ))}
    </section>
  );
}
