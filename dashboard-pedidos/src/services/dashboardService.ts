import { api } from "./api";

// --- Interfaces Específicas do Dashboard ---
// (Exatamente as que estavam no seu DashboardHome.tsx)
interface ApiProdutoItem {
  produto: { nome: string; };
}

interface ApiPedido {
  id: number;
  cliente: { nome: string; };
  produtos: ApiProdutoItem[];
  status: string;
}

// Interfaces genéricas para contagem
interface ApiCliente { id: number; }
interface ApiProduto { id: number; }

// --- Tipos de Retorno para o Componente ---
// (O que o seu componente realmente precisa)
export interface DashboardStats {
  clientes: number;
  produtos: number;
  pedidos: number;
}

export interface UltimoPedido {
  id: number;
  cliente: string;
  produto: string;
  status: string;
}

// O tipo de retorno da nossa função principal
interface DashboardData {
  stats: DashboardStats;
  ultimosPedidos: UltimoPedido[];
}

/**
 * Busca e formata todos os dados necessários para o dashboard.
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  // 1. Faz as 3 chamadas em paralelo
  const [pedidosRes, clientesRes, produtosRes] = await Promise.all([
    api.get<ApiPedido[]>('/pedidos'),
    api.get<ApiCliente[]>('/clientes'),
    api.get<ApiProduto[]>('/produtos')
  ]);

  // 2. Calcula as estatísticas
  const stats: DashboardStats = {
    clientes: clientesRes.data.length,
    produtos: produtosRes.data.length,
    pedidos: pedidosRes.data.length,
  };

  // 3. Formata os últimos pedidos
  const ultimosPedidos: UltimoPedido[] = pedidosRes.data
    .slice(0, 5) // Pega os 5 primeiros
    .map((pedido) => ({
      id: pedido.id,
      cliente: pedido.cliente.nome,
      produto: pedido.produtos.map((p) => p.produto.nome).join(', '),
      status: pedido.status,
    }));

  // 4. Retorna tudo pronto para o componente
  return { stats, ultimosPedidos };
};