import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

const clienteService = new ClienteService();

export class ClienteController {
  async listar(req: Request, res: Response) {
    try {
      const clientes = await clienteService.listar();
      res.json(clientes);
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      res.status(500).json({ message: "Erro ao listar clientes" });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "ID é obrigatório" });

      const cliente = await clienteService.buscarPorId(Number(id));
      if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });

      res.json(cliente);
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      res.status(500).json({ message: "Erro ao buscar cliente" });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" });
      }

      const cliente = await clienteService.criar(nome, email);
      res.status(201).json(cliente);
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      res.status(400).json({ message: error.message || "Erro ao criar cliente" });
    }
  }

  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      if (!id) return res.status(400).json({ message: "ID é obrigatório" });

      if (!nome && !email) {
        return res.status(400).json({ message: "Informe nome ou email para atualizar" });
      }

      const clienteAtualizado = await clienteService.editar(Number(id), { nome, email });
      res.json(clienteAtualizado);
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      res.status(400).json({ message: error.message || "Erro ao editar cliente" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "ID é obrigatório" });

      await clienteService.deletar(Number(id));
      res.json({ message: "Cliente deletado com sucesso" });
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      res.status(400).json({ message: error.message || "Erro ao deletar cliente" });
    }
  }
}
