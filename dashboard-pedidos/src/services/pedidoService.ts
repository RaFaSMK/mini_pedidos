import { api } from "./api";
import { Cliente } from "./clienteService";
import { Produto } from "./produtoService";

// --- NOVAS INTERFACES ---
// Representa o item aninhado: { produto: { ... } }
interface PedidoProdutoItem {
  produto: Produto;
}

// Interface 'Pedido' CORRIGIDA para corresponder ao backend
export interface Pedido {
  id: number;
  cliente_id: number; // O backend envia isso
  cliente: Cliente;   // O backend envia isso (include)
  produtos: PedidoProdutoItem[]; // O backend envia um ARRAY (include)
  status: string;
  data: string; // (Vem do 'createdAt' do Prisma, presumo)
}
// ------------------------

// Interface para Criar/Editar (baseada no seu 'payload' do handleSubmit)
export interface PedidoData {
  cliente_id: number;
  produtos_ids: number[];
}

// --- NOVA INTERFACE ---
// Interface para atualizar SOMENTE o status
export interface PedidoStatusData {
  status: string;
}
// --------------------

/**
 * Busca todos os pedidos.
 */
export const getAllPedidos = async (): Promise<Pedido[]> => {
  const response = await api.get<Pedido[]>('/pedidos');
  return response.data;
};

/**
 * Cria um novo pedido.
 */
export const createPedido = async (data: PedidoData): Promise<Pedido> => {
  const response = await api.post<Pedido>('/pedidos', data);
  return response.data;
};

/**
 * Atualiza um pedido existente (lógica do modal).
 */
export const updatePedido = async (id: number, data: PedidoData): Promise<Pedido> => {
  const response = await api.put<Pedido>(`/pedidos/${id}`, data);
  return response.data;
};

// --- NOVA FUNÇÃO ---
/**
 * Atualiza *apenas o status* de um pedido.
 * O endpoint de edição do backend já aceita isso.
 */
export const updatePedidoStatus = async (id: number, data: PedidoStatusData): Promise<Pedido> => {
  const response = await api.put<Pedido>(`/pedidos/${id}`, data);
  return response.data;
};
// -------------------