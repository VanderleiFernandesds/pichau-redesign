import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Modal from '../ui/Modal';
import { HELP_TOPICS, OFFICIAL_STORE_URL } from '../../data/footer';

/*
  Central de ajuda demonstrativa. Aberta por um tópico (links "Informações" do footer), leva o foco
  e a rolagem até ele; aberta pelo botão "Central de ajuda", começa do topo.
*/
export default function HelpCenterModal({ isOpen, topicId, onClose }) {
  const topicRefs = useRef({});

  // O Modal (filho) abre o <dialog> no efeito dele, que roda antes deste; o foco vai depois.
  useEffect(() => {
    if (!isOpen || !topicId) return;
    const frame = requestAnimationFrame(() => topicRefs.current[topicId]?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen, topicId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Central de ajuda" closeLabel="Fechar central de ajuda">
      <p className="mt-2 text-[13px] leading-relaxed text-muted">
        Projeto de estudo: as informações abaixo explicam o que é simulado neste site.
      </p>

      <div className="mt-2 divide-y divide-line">
        {HELP_TOPICS.map((topic) => (
          <section key={topic.id} aria-labelledby={`help-${topic.id}`} className="py-5">
            <h3
              id={`help-${topic.id}`}
              ref={(element) => {
                topicRefs.current[topic.id] = element;
              }}
              tabIndex={-1}
              className="scroll-mt-4 font-display text-[19px] font-bold text-heading outline-offset-4"
            >
              {topic.title}
            </h3>
            {topic.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-[14px] leading-relaxed text-soft">
                {paragraph}
              </p>
            ))}
            {topic.hasStoreLink && (
              <a
                href={OFFICIAL_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-heading underline-offset-4 hover:text-brand hover:underline"
              >
                Visitar o site oficial da Pichau
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </section>
        ))}
      </div>
    </Modal>
  );
}
