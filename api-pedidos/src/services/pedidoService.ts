import { prisma } from "../config/prisma";

export class PedidoService {
  async listar() {
    return await prisma.pedido.findMany({
      include: {
        cliente: true,
        produtos: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });
  }

  async criar(cliente_id: number, produtos_ids: number[]) {
    const cliente = await prisma.cliente.findUnique({ where: { id: cliente_id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    const pedido = await prisma.pedido.create({
      data: {
        cliente_id,
        status: "PENDENTE",
        produtos: {
          create: produtos_ids.map((id) => ({
            produto: { connect: { id } },
          })),
        },
      },
      include: {
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });

    return pedido;
  }

  async editar(id: number, data: { status?: string; produtos_ids?: number[] }) {
    const pedidoExistente = await prisma.pedido.findUnique({
      where: { id },
      include: { produtos: true },
    });

    if (!pedidoExistente) throw new Error("Pedido não encontrado");

    if (data.produtos_ids && data.produtos_ids.length > 0) {
      await prisma.pedidoProduto.deleteMany({
        where: { pedido_id: id },
      });

      await prisma.pedidoProduto.createMany({
        data: data.produtos_ids.map((produto_id) => ({
          pedido_id: id,
          produto_id,
        })),
      });
    }

    const pedidoAtualizado = await prisma.pedido.update({
      where: { id },
      data: {
        status: data.status ?? pedidoExistente.status,
      },
      include: {
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });

    return pedidoAtualizado;
  }

  async deletar(id: number) {
    const pedido = await prisma.pedido.findUnique({ where: { id } });
    if (!pedido) throw new Error("Pedido não encontrado");

    await prisma.pedidoProduto.deleteMany({
      where: { pedido_id: id },
    });

    await prisma.pedido.delete({
      where: { id },
    });

    return true;
  }
}
