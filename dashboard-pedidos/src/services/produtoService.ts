import { api } from "./api";

// Interface do Produto (baseada na sua ProdutosPage)
export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Interface para Criar/Editar (baseada no seu handleSubmit)
export interface ProdutoData {
  nome: string;
  preco: number;
}

/**
 * Busca todos os produtos.
 */
export const getAllProdutos = async (): Promise<Produto[]> => {
  const response = await api.get<Produto[]>('/produtos');
  return response.data;
};

/**
 * Cria um novo produto.
 */
export const createProduto = async (data: ProdutoData): Promise<Produto> => {
  const response = await api.post<Produto>('/produtos', data);
  return response.data;
};

/**
 * Atualiza um produto existente.
 */
export const updateProduto = async (id: number, data: ProdutoData): Promise<Produto> => {
  const response = await api.put<Produto>(`/produtos/${id}`, data);
  return response.data;
};

/**
 * Deleta um produto.
 */
export const deleteProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};