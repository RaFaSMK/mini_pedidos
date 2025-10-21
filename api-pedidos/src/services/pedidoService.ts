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
}
