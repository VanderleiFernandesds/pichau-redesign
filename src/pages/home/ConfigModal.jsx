import Modal from '../../components/ui/Modal';
import { BUILDER_GOALS } from '../../data/home';

export default function ConfigModal({ isOpen, onClose, onSelectGoal }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Qual é o seu objetivo?" closeLabel="Fechar configuração">
      <p className="my-[1em] text-[12px] leading-[1.6] text-muted">
        Escolha por onde começar. A compatibilidade das peças deve ser verificada antes da compra.
      </p>
      <div className="mt-5 grid gap-2.5">
        {BUILDER_GOALS.map(({ label, category, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelectGoal(category)}
            className="flex items-center gap-2.5 rounded-[5px] border border-line bg-fill p-5 text-left transition-colors hover:border-brand/60 hover:bg-brand/10"
          >
            <Icon aria-hidden="true" className="size-5" />
            {label}
          </button>
        ))}
      </div>
    </Modal>
  );
}
