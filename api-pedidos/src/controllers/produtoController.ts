import { Request, Response } from "express";
import { ProdutoService } from "../services/produtoService";

const produtoService = new ProdutoService()

export class ProdutoController {
  async listar(req: Request, res: Response) {
    try {
      const produtos = await produtoService.listar()
      res.json(produtos)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro ao listar os produtos" })
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { nome, preco } = req.body
      if (!nome || !preco) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios" })
      }
      const produto = await produtoService.criar(nome, parseFloat(preco))
      res.status(201).json(produto)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro ao criar produto" })
    }
  }
}