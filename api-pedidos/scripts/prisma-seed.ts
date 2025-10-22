import { PrismaClient } from '@prisma/client';

// Instancia o Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed...');

  // 1. Limpar o banco de dados (na ordem correta)
  await prisma.pedidoProduto.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.produto.deleteMany();
  console.log('Banco de dados limpo.');

  // 2. Criar Clientes e guardar os resultados em variáveis
  const clienteRafael = await prisma.cliente.create({
    data: { nome: 'Rafael Chaves Souza', email: 'rafael@email.com' },
  });
  const clienteMaria = await prisma.cliente.create({
    data: { nome: 'Maria Silva', email: 'maria@email.com' },
  });
  await prisma.cliente.create({
    data: { nome: 'Carlos Pereira', email: 'carlos@email.com' },
  });
  console.log('Clientes criados.');

  // 3. Criar Produtos e guardar os resultados em variáveis
  const produtoRock = await prisma.produto.create({
    data: { nome: 'Ingresso Show Rock', preco: 120.50 },
  });
  const produtoPop = await prisma.produto.create({
    data: { nome: 'Ingresso Show Pop', preco: 99.90 },
  });
  const produtoVip = await prisma.produto.create({
    data: { nome: 'Ingresso Camarote VIP', preco: 250.00 },
  });
  console.log('Produtos criados.');

  // 4. Criar Pedidos (Agora sem 'findMany' e sem erros!)

  // Pedido 1: Rafael (PAGO) comprou 1 Ingresso Rock
  await prisma.pedido.create({
    data: {
      cliente_id: clienteRafael.id, // <-- Corrigido
      status: 'PAGO',
      produtos: {
        create: [
          { produto_id: produtoRock.id }, // <-- Corrigido
        ],
      },
    },
  });

  // Pedido 2: Maria (PENDENTE) comprou 1 Ingresso Pop e 1 Camarote VIP
  await prisma.pedido.create({
    data: {
      cliente_id: clienteMaria.id, // <-- Corrigido
      status: 'PENDENTE',
      produtos: {
        create: [
          { produto_id: produtoPop.id }, // <-- Corrigido
          { produto_id: produtoVip.id }, // <-- Corrigido
        ],
      },
    },
  });

  console.log('Pedidos criados.');
  console.log('Seed concluído com sucesso! 🌱');
}

// Executa a função principal e lida com erros
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão com o banco
    await prisma.$disconnect();
  });