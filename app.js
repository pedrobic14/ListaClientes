import { Cliente, ClienteAPI } from './classes.js';
import { criarElementoCliente, validarDados, limparFormulario } from './utils.js';

const API_URL = 'https://68ee912edf2025af78041f4b.mockapi.io/api/4/clientes';
const clienteAPI = new ClienteAPI(API_URL);

document.addEventListener('DOMContentLoaded', () => {
  const listaClientes = document.getElementById('listaclientes');
  const botaoAdd = document.getElementById('add');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');

  async function handleRemove(id, elemento) {
    try {
      await clienteAPI.remove(id);
      elemento.remove();
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  }

  async function carregarClientes() {
    try {
      const clientes = await clienteAPI.getAll();
      listaClientes.innerHTML = '';
      clientes.forEach(cliente => {
        const elemento = criarElementoCliente(cliente, handleRemove);
        listaClientes.appendChild(elemento);
      });
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  }

  async function handleAdd() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    try {
      validarDados(nome, email);
      const cliente = await clienteAPI.add(nome, email);
      const elemento = criarElementoCliente(cliente, handleRemove);
      listaClientes.appendChild(elemento);
      limparFormulario(nomeInput, emailInput);
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      alert(err.message);
    }
  }

  botaoAdd.addEventListener('click', handleAdd);
  carregarClientes();
});