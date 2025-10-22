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

  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, preco } = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID do produto é obrigatório" });
      }
      if (!nome && !preco) {
        return res.status(400).json({ message: "Informe nome ou preço para atualizar" });
      }
      const produtoAtualizado = await produtoService.editar(Number(id), { nome, preco });
      if (!produtoAtualizado) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(produtoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao editar produto" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID do produto é obrigatório" });
      }
      const produtoDeletado = await produtoService.deletar(Number(id));
      if (!produtoDeletado) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar produto" });
    }
  }
}