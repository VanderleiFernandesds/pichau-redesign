// Mesma regra do type="email" do navegador, só que com mensagens próprias em português.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email) return 'Informe seu e-mail.';
  if (!EMAIL_PATTERN.test(email)) return 'Digite um e-mail válido, como nome@exemplo.com.';
  return '';
}
