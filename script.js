document.addEventListener('DOMContentLoaded', () => {
  const listaClientes = document.getElementById('listaclientes');
  const botaoAdd = document.getElementById('add');
  const API_URL = 'https://68ee912edf2025af78041f4b.mockapi.io/api/4/clientes';

  // 🧱 Função para criar item na lista
  function criarItem(cliente) {
  const item = document.createElement('li');
  item.innerHTML = `
    <div>
      <strong>${cliente.nome}</strong>
      <span>${cliente.email}</span>
    </div>
    <button>X</button>
  `;

  item.querySelector('button').addEventListener('click', () => {
    fetch(`${API_URL}/${cliente.id}`, { method: 'DELETE' })
      .then(() => item.remove())
      .catch(err => console.error('Erro ao excluir cliente:', err));
  });

  listaClientes.appendChild(item);
}


  // 🔄 Carregar clientes ao iniciar
  fetch(API_URL)
    .then(res => res.json())
    .then(clientes => {
      listaClientes.innerHTML = '';
      clientes.forEach(criarItem);
    })
    .catch(err => console.error('Erro ao carregar clientes:', err));

  // ➕ Adicionar novo cliente
  botaoAdd.addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nome || !email) {
      alert('Preencha nome e e-mail!');
      return;
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cadastrar');
        return res.json();
      })
      .then(cliente => {
        criarItem(cliente);
        document.getElementById('nome').value = ''; 
        document.getElementById('email').value = '';
      })
      .catch(err => console.error('Erro ao adicionar cliente:', err));
  });
});
