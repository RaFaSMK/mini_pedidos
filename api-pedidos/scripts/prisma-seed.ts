import { prisma } from "../src/config/prisma";

async function main() {
  await prisma.cliente.createMany({
    data: [
      { nome: "Jõao", email: "joao@gmail.com" },
      { nome: "Maria", email: "maria@gmail.com" },
    ],
  })

  await prisma.produto.createMany({
    data: [
      { nome: "Ingresso VIP", preco: 120.0 },
      { nome: "Ingresso Pista", preco: 60.0 },
    ]
  })
}

main()
  .then(() => {
    console.log("Banco populado com sucesso")
  })
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())