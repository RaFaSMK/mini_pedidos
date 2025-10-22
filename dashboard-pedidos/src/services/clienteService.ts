import { api } from "./api";

// Interface para os dados do cliente (usada em vários lugares)
export interface Cliente {
  id: number;
  nome: string;
  email: string;
}

// Interface para os dados de criação/atualização (sem o ID)
// Baseado no seu 'formData'
export interface ClienteData {
  nome: string;
  email: string;
}

/**
 * Busca todos os clientes.
 */
export const getAllClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>('/clientes');
  return response.data;
};

/**
 * Cria um novo cliente.
 * @param data - Os dados (nome, email) do novo cliente.
 */
export const createCliente = async (data: ClienteData): Promise<Cliente> => {
  const response = await api.post<Cliente>('/clientes', data);
  return response.data;
};

/**
 * Atualiza um cliente existente.
 * @param id - O ID do cliente a ser atualizado.
 * @param data - Os novos dados (nome, email) do cliente.
 */
export const updateCliente = async (id: number, data: ClienteData): Promise<Cliente> => {
  const response = await api.put<Cliente>(`/clientes/${id}`, data);
  return response.data;
};

/**
 * Deleta um cliente.
 * @param id - O ID do cliente a ser deletado.
 */
export const deleteCliente = async (id: number): Promise<void> => {
  await api.delete(`/clientes/${id}`);
};