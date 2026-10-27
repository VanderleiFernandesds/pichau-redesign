import { useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import DepartmentList from './DepartmentList';
import DepartmentDetail from './DepartmentDetail';
import { DEPARTMENT_GROUPS } from '../../../../data/departments';
import { useSlidingDialog } from '../../../../hooks/useSlidingDialog';

const MOBILE_QUERY = '(width < 1001px)';
const HOVER_DELAY = 120;

function normalize(text) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
}

/*
  A busca mantém o departamento quando o nome dele bate e, se não, só os assuntos e subcategorias
  que batem; grupos sem nenhum departamento somem.
*/
function filterGroups(query) {
  const term = normalize(query.trim());
  if (!term) return DEPARTMENT_GROUPS;

  return DEPARTMENT_GROUPS.map((group) => ({
    ...group,
    departments: group.departments.flatMap((department) => {
      if (normalize(department.name).includes(term)) return [department];

      const sections = department.sections
        .map((section) =>
          normalize(section.title).includes(term)
            ? section
            : { ...section, items: section.items.filter((item) => normalize(item).includes(term)) },
        )
        .filter((section) => section.items.length > 0);

      return sections.length > 0 ? [{ ...department, sections }] : [];
    }),
  })).filter((group) => group.departments.length > 0);
}

/*
  <dialog> nativo com showModal(): o navegador prende o foco, fecha com Esc e coloca o menu na
  camada superior, acima do header fixo. Desktop: lista e subcategorias lado a lado; abaixo de
  1001px, um painel por vez (data-level), com "Voltar".
*/
export default function DepartmentMenu({ isOpen, onClose, triggerRef, onOpenDepartment, onNavigate }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const titleRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const [query, setQuery] = useState('');
  // Nenhum departamento começa selecionado; sem seleção, o desktop mostra só a lista.
  const [selectedId, setSelectedId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const groups = filterGroups(query);
  const visibleDepartments = groups.flatMap((group) => group.departments);
  const activeDepartment = visibleDepartments.find(({ id }) => id === selectedId) ?? null;

  // O painel recebe o foco, e não a busca, para o teclado virtual não abrir sozinho no celular.
  useSlidingDialog(isOpen, dialogRef, panelRef, () => panelRef.current.focus());

  /*
    Desktop: as subcategorias descem até a altura do departamento escolhido na lista, sem passar da
    base da tela (--detail-top, usado em index.css). Refaz a conta quando o painel ou as
    subcategorias mudam de tamanho: enquanto o painel alarga, o texto quebra mais e elas ficam mais
    altas.
  */
  const activeId = activeDepartment?.id;
  const isDetailPlacedRef = useRef(false);
  useLayoutEffect(() => {
    if (!activeId) {
      isDetailPlacedRef.current = false;
      return;
    }
    const panel = panelRef.current;
    const detail = panel.querySelector('.department-menu-detail');

    // Só a troca de departamento desliza; ao aparecer e nos ajustes de tamanho o painel vai direto.
    function placeDetail(isAnimated) {
      const button = panel.querySelector('[aria-controls="department-detail"][aria-current]');
      if (!button || window.matchMedia(MOBILE_QUERY).matches) return;

      const panelRect = panel.getBoundingClientRect();
      const lowest = panelRect.height - detail.offsetHeight;
      const top = button.getBoundingClientRect().top - panelRect.top;
      if (!isAnimated) detail.style.transition = 'none';
      panel.style.setProperty('--detail-top', `${Math.max(0, Math.min(top, lowest))}px`);
      if (!isAnimated) {
        detail.getBoundingClientRect();
        detail.style.transition = '';
      }
    }

    placeDetail(isDetailPlacedRef.current);
    isDetailPlacedRef.current = true;

    // A primeira notificação do observer só repete a medida inicial e cortaria o deslize.
    let isFirstNotice = true;
    const observer = new ResizeObserver(() => {
      if (!isFirstNotice) placeDetail(false);
      isFirstNotice = false;
    });
    observer.observe(panel);
    observer.observe(detail);
    return () => observer.disconnect();
  }, [activeId]);

  // Esc passa pelo mesmo fechamento animado em vez de fechar o <dialog> direto.
  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  /*
    O evento close vem de qualquer fechamento (X, Esc, clique fora ou escolha de um link). A próxima
    abertura começa do primeiro nível, sem busca nem seleção, e o foco volta ao botão "Departamentos".
  */
  function handleClose() {
    clearTimeout(hoverTimerRef.current);
    clearTimeout(leaveTimerRef.current);
    delete dialogRef.current.dataset.closing;
    setQuery('');
    setSelectedId(null);
    setIsDetailOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
    onClose();
  }

  function selectDepartment(id) {
    setSelectedId(id);
    if (!window.matchMedia(MOBILE_QUERY).matches) return;

    // Abaixo de 1001px a lista some ao abrir o nível seguinte; o foco vai para o nome do departamento.
    setIsDetailOpen(true);
    requestAnimationFrame(() => titleRef.current?.focus());
  }

  /*
    Desktop com mouse: o hover escolhe o departamento. A pausa curta evita trocar de departamento
    quando o cursor só passa pelos itens a caminho do painel da direita. Toque e teclado continuam
    no clique.
  */
  function hoverDepartment(id, event) {
    if (event.pointerType !== 'mouse' || window.matchMedia(MOBILE_QUERY).matches) return;
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setSelectedId(id), HOVER_DELAY);
  }

  function cancelHover() {
    clearTimeout(hoverTimerRef.current);
  }

  /*
    O cursor no fundo (o próprio <dialog>, fora do painel) desfaz a seleção: o painel volta a ser só
    a lista e o fundo clareia. Voltar ao painel antes da pausa cancela.
  */
  function handleDialogPointerOver(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia(MOBILE_QUERY).matches) return;
    clearTimeout(leaveTimerRef.current);
    if (event.target !== dialogRef.current) return;

    clearTimeout(hoverTimerRef.current);
    leaveTimerRef.current = setTimeout(() => setSelectedId(null), HOVER_DELAY);
  }

  function goBack() {
    setIsDetailOpen(false);
    requestAnimationFrame(() => dialogRef.current.querySelector('[aria-controls="department-detail"][aria-current]')?.focus());
  }

  // O <dialog> ocupa a tela toda; um clique fora do painel cai nele próprio.
  function handleDialogClick(event) {
    if (event.target === dialogRef.current) onClose();
  }

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Fechar departamentos"
      className="grid size-11 place-items-center text-muted transition-colors hover:text-brand"
    >
      <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      id="department-menu"
      aria-label="Departamentos"
      onClose={handleClose}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      onPointerOver={handleDialogPointerOver}
      className="department-menu"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        data-level={isDetailOpen ? 'detail' : 'list'}
        data-has-detail={activeDepartment ? '' : undefined}
        className="department-menu-panel chamfer outline-none"
      >
        <DepartmentList
          groups={groups}
          activeId={activeDepartment?.id}
          query={query}
          onQueryChange={setQuery}
          onSelect={selectDepartment}
          onHover={hoverDepartment}
          onHoverEnd={cancelHover}
          onNavigate={onNavigate}
          closeButton={closeButton}
        />
        <DepartmentDetail
          department={activeDepartment}
          titleRef={titleRef}
          onBack={goBack}
          onOpen={onOpenDepartment}
          closeButton={closeButton}
        />
        <p aria-live="polite" className="sr-only">
          {query.trim() ? `${visibleDepartments.length} departamento(s) encontrado(s)` : ''}
        </p>
      </div>
    </dialog>
  );
}
