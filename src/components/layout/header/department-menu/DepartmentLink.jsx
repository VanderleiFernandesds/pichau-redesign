// Departamentos com produtos levam às ofertas filtradas; os demais ainda não têm página na loja
// conceito e viram um botão que avisa isso, em vez de um link que não leva a lugar nenhum.
export default function DepartmentLink({ department, onOpen, className, children }) {
  if (department.productCategory) {
    return (
      <a href="#offers" onClick={() => onOpen(department)} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onOpen(department)} className={className}>
      {children}
    </button>
  );
}
