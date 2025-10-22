import { prisma } from "../config/prisma";

export class ProdutoService {
  async listar() {
    return await prisma.produto.findMany()
  }

  async criar(nome: string, preco: number) {
    return await prisma.produto.create({
      data: { nome, preco }
    })
  }

  async editar(id: number, data: { nome?: string; preco?: number }) {
    return prisma.produto.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    return prisma.produto.delete({
      where: { id },
    });
  }
}