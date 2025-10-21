import { prisma } from "../config/prisma";

export class ClienteService {
  async listar() {
    return await prisma.cliente.findMany()
  }

  async criar(nome: string, email: string) {
    return await prisma.cliente.create({
      data: { nome, email }
    })
  }
}