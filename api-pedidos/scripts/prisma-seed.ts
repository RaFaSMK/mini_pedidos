import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed...');

  await prisma.pedidoProduto.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.produto.deleteMany();
  console.log('Banco de dados limpo.');

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


  await prisma.pedido.create({
    data: {
      cliente_id: clienteRafael.id, 
      status: 'PAGO',
      produtos: {
        create: [
          { produto_id: produtoRock.id }, 
        ],
      },
    },
  });

  await prisma.pedido.create({
    data: {
      cliente_id: clienteMaria.id,
      status: 'PENDENTE',
      produtos: {
        create: [
          { produto_id: produtoPop.id }, 
          { produto_id: produtoVip.id }, 
        ],
      },
    },
  });

  console.log('Pedidos criados.');
  console.log('Seed concluído com sucesso! 🌱');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });