import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"

const clienteService = new ClienteService()

export class ClienteController {
  async listar(req: Request, res: Response) {
    try {
      const clientes = await clienteService.listar()
      res.json(clientes)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro ao listar os clientes!" })
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { nome, email } = req.body
      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" })
      }
      const cliente = await clienteService.criar(nome, email)
      res.status(201).json(cliente)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro ao criar cliente" })
    }
  }
}