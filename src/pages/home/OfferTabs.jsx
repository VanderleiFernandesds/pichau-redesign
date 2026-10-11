import { OFFER_TABS } from '../../data/categories';

export default function OfferTabs({ activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-[5px] sm:gap-2" role="group" aria-label="Filtrar produtos">
      {OFFER_TABS.map((tab) => {
        const isActive = tab === activeCategory;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect(tab)}
            aria-pressed={isActive}
            className={`rounded-sm px-3 py-[9px] text-[10px] sm:px-[15px] sm:py-2.5 sm:text-[11px] ${
              isActive ? 'bg-brand text-white' : 'bg-fill hover:bg-fill-hover'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
