import { prisma } from "../config/prisma";

export class ClienteService {
  async listar() {
    return await prisma.cliente.findMany({
      orderBy: { id: "desc" },
    });
  }

  async buscarPorId(id: number) {
    return await prisma.cliente.findUnique({
      where: { id },
      include: { pedidos: true },
    });
  }

  async criar(nome: string, email: string) {
    const clienteExistente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (clienteExistente) throw new Error("Email já cadastrado");

    return await prisma.cliente.create({
      data: { nome, email },
    });
  }

  async editar(id: number, data: { nome?: string; email?: string }) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    if (data.email) {
      const emailExiste = await prisma.cliente.findUnique({
        where: { email: data.email },
      });
      if (emailExiste && emailExiste.id !== id) {
        throw new Error("Este email já está sendo usado por outro cliente");
      }
    }

    return await prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    await prisma.cliente.delete({ where: { id } });
    return true;
  }
}
