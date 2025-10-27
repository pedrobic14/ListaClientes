export function criarElementoCliente(cliente, onRemove) {
  const item = document.createElement('li');
  item.innerHTML = `
    <div>
      <strong>${cliente.nome}</strong>
      <span>${cliente.email}</span>
    </div>
    <button>X</button>
  `;

  item.querySelector('button').addEventListener('click', () => onRemove(cliente.id, item));
  return item;
}

export function validarDados(nome, email) {
  if (!nome || !email) {
    throw new Error('Preencha nome e e-mail!');
  }
  return true;
}

export function limparFormulario(nomeEl, emailEl) {
  nomeEl.value = '';
  emailEl.value = '';
  nomeEl.focus();
}