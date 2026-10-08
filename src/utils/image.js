// alt="" não basta: com largura definida, o Chrome desenha o ícone de imagem quebrada e uma borda.
export function hideBrokenImage(event) {
  event.currentTarget.hidden = true;
}
