export class Cliente {
  constructor(id, nome, email) {
    this.id = id;
    this.nome = nome.trim();
    this.email = email.trim();
  }
}

export class ClienteAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getAll() {
    const res = await fetch(this.baseURL);
    if (!res.ok) throw new Error('Erro ao carregar clientes');
    return res.json();
  }

  async add(nome, email) {
    const res = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });
    if (!res.ok) throw new Error('Erro ao cadastrar cliente');
    return res.json();
  }

  async remove(id) {
    const res = await fetch(`${this.baseURL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao remover cliente');
  }
}