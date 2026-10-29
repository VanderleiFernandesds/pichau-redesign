import { useEffect, useRef } from 'react';
import { ArrowUpRight, Heart, ShoppingCart } from 'lucide-react';
import StarRating from '../ui/StarRating';
import CardQuantityControl from './CardQuantityControl';
import ProductBenefits from './ProductBenefits';
import { formatMoney } from '../../utils/format';
import { animateAddToCart } from '../../utils/cartAnimation';
import { INSTALLMENTS, getCardPrice, getDiscountPercent, hasIllustrativeConditions } from '../../utils/pricing';
import { productPath } from '../../hooks/useRoute';

/*
  As 6 linhas do card (imagem, nome, especificações, avaliação, preço e botões) são um subgrid da
  vitrine, então ficam alinhadas entre os cards da mesma linha mesmo quando um texto quebra ou um
  produto não tem avaliação. Por isso o
  card compacto usa media query (abaixo de 640px), e não container query: a contenção de layout
  dela desativa o subgrid.
*/
/*
  quantity vem do carrinho compartilhado (useCart), então cards repetidos, o painel do carrinho e o
  contador do header mostram sempre o mesmo valor. isImageDeferred deixa a foto sem src até o load
  da página (ver ProductSection e ProductCarousel).
*/
export default function ProductCard({
  product,
  quantity,
  isFavorite,
  isImageDeferred = false,
  onToggleFavorite,
  onAddToCart,
  onChangeQuantity,
  onView,
}) {
  const cardPrice = getCardPrice(product);
  const discountPercent = getDiscountPercent(product);
  const isInCart = quantity > 0;
  const lastSpace = product.name.lastIndexOf(' ') + 1;
  const nameStart = product.name.slice(0, lastSpace);
  const nameEnd = product.name.slice(lastSpace);
  const addButtonRef = useRef(null);
  const plusButtonRef = useRef(null);
  // Qual botão recebe o foco quando o controle trocar: o "+" ao entrar no carrinho, o adicionar ao sair.
  const pendingFocusRef = useRef(null);

  useEffect(() => {
    if (!pendingFocusRef.current) return;
    pendingFocusRef.current.current?.focus();
    pendingFocusRef.current = null;
  }, [isInCart]);

  /*
    O card inteiro abre o produto, como o nome. É só um atalho para o mouse e o toque: no teclado o
    caminho é o link do nome, e os controles de dentro (favoritar, carrinho e quantidade) mantêm
    a ação deles.
  */
  function handleCardClick(event) {
    if (event.target.closest('a, button, [role="group"]')) return;
    onView(product.id);
  }

  // Com o limite atingido o produto não entra: só o aviso aparece, sem animação nem troca de foco.
  function handleAdd(event) {
    const article = event.currentTarget.closest('article');
    if (!onAddToCart(product.id)) return;
    if (!isInCart) pendingFocusRef.current = plusButtonRef;
    animateAddToCart(article.querySelector('.product-media img'));
  }

  function handleDecrease() {
    if (quantity === 1) pendingFocusRef.current = addButtonRef;
    onChangeQuantity(product.id, -1);
  }

  return (
    <article
      onClick={handleCardClick}
      className="group chamfer purpose-card row-span-6 grid cursor-pointer grid-rows-subgrid gap-0 p-3 text-heading sm:p-4"
    >
      <span aria-hidden="true" className="corner-accents" />

      {/*
        As fotos têm fundo branco; ficam numa área clara, em vez de um recorte sobre o grafite. No
        celular o respiro é mínimo, para o produto ocupar mais da área (não há hover para ampliar).
        A altura é fixa em cada largura, com ou sem etiquetas, para os cards seguirem alinhados: a
        foto ocupa o que sobra acima delas, sempre inteira (object-contain).
      */}
      {/* A área branca avança sobre o padding do card nas laterais e em cima, até 4px da borda. */}
      <div className="chamfer product-media relative -mx-2 -mt-2 flex h-54 flex-col p-1 sm:-mx-3 sm:-mt-3 sm:h-59 sm:p-3">
        <img
          src={isImageDeferred ? undefined : product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="240"
          height="190"
          // A ampliação no hover cabe no respiro (p-2/p-3) da área branca, sem encostar na borda.
          className="min-h-0 w-full flex-1 object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-106"
        />
        <ProductBenefits coupon={product.coupon} shipping={product.shipping} />
        {discountPercent > 0 && (
          <span className="chamfer chamfer-accent discount-badge absolute top-2 left-2 px-1.5 py-0.5 text-[11px] font-bold text-white sm:top-3 sm:left-3 sm:px-2 sm:py-1 sm:text-[13px]">
            {discountPercent}% OFF
          </span>
        )}
        {/* No celular o chip é menor que o botão, para não cobrir a foto; a área de toque segue com 44px. */}
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={`Favoritar ${product.name}`}
          className={`absolute top-0 right-0 grid size-11 place-items-center sm:top-1 sm:right-1 ${isFavorite ? 'text-brand' : 'text-heading'}`}
        >
          <span className="chamfer chip-button grid size-7 place-items-center sm:size-10">
            <Heart aria-hidden="true" className={`size-3.5 sm:size-4.5 ${isFavorite ? 'fill-current' : ''}`} />
          </span>
        </button>
      </div>

      {/*
        O nome é o caminho do teclado até o produto (o clique no card, inclusive na foto, é só um
        atalho para mouse e toque), com a seta logo depois do texto. O nome inteiro continua no
        texto (leitor de tela) e no title; o corte em linhas é só visual.
      */}
      <h3 className="mt-3 font-display text-[15px] leading-tight font-bold sm:text-[17px]">
        {/* Link de verdade (abre em nova aba, copia o endereço); o clique comum vira navegação interna. */}
        <a
          href={productPath(product.slug)}
          title={product.name}
          className="line-clamp-3 text-left transition-colors hover:text-brand sm:line-clamp-2"
        >
          {/* A última palavra e a seta não quebram entre si: a seta nunca vai sozinha para outra linha. */}
          {nameStart}
          <span className="whitespace-nowrap">
            {nameEnd}
            <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4 align-[-2px] text-muted" />
          </span>
        </a>
      </h3>
      <p className="mt-1 text-[12px] leading-snug text-soft sm:text-[13px]">{product.spec}</p>
      <StarRating rating={product.rating} className="mt-1 sm:mt-2" />

      {/*
        Preço, pagamento e aviso de condições ilustrativas: com ou sem eles, os botões seguem
        alinhados pelo subgrid. "no Pix" fica ao lado do valor, que não quebra, e desce para a
        linha de baixo quando não cabe.
      */}
      <div className="pt-1.5 sm:pt-3">
        {discountPercent > 0 && (
          <p className="text-[12px] text-muted sm:text-[13px]">
            De <s>{formatMoney(product.previousPrice)}</s> no Pix
            <span className="sr-only">, por</span>
          </p>
        )}
        <p className="flex flex-wrap items-baseline gap-x-1.5 text-success">
          <span className="text-[clamp(20px,6vw,24px)] leading-tight font-extrabold tracking-[-0.5px] whitespace-nowrap sm:text-[24px]">
            {formatMoney(product.price)}
          </span>
          <span className="text-[12px] font-semibold">no Pix</span>
        </p>
        <p className="mt-1 text-[12px] leading-normal text-soft sm:text-[12px]">
          {INSTALLMENTS}x de <span className="whitespace-nowrap">{formatMoney(cardPrice / INSTALLMENTS)}</span>{' '}
          <span className="whitespace-nowrap">sem juros</span>
          <br />
          Total no cartão: <span className="whitespace-nowrap">{formatMoney(cardPrice)}</span>
        </p>
        {hasIllustrativeConditions(product) && (
          <p className="mt-1 text-[12px] leading-snug text-muted">Condições ilustrativas</p>
        )}
      </div>

      {/*
        Ação na base do card, na largura toda: adicionar ou, depois de adicionado, o controle de
        quantidade, com a mesma altura (44px), então a linha não muda de tamanho.
      */}
      <div className="mt-3 flex flex-col">
        {isInCart ? (
          <CardQuantityControl
            product={product}
            quantity={quantity}
            plusRef={plusButtonRef}
            onIncrease={handleAdd}
            onDecrease={handleDecrease}
          />
        ) : (
          <button
            ref={addButtonRef}
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="chamfer chamfer-accent product-card-cta flex h-11 items-center justify-center gap-2 px-2 text-[13px] font-bold tracking-[0.5px] whitespace-nowrap text-white uppercase"
          >
            <ShoppingCart aria-hidden="true" className="size-4.5 shrink-0" />
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}
