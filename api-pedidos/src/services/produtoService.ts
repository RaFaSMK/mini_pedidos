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
}