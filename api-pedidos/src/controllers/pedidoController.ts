import { Request, Response } from "express";
import { PedidoService } from "../services/pedidoService";

const pedidoService = new PedidoService();

export class PedidoController {
  async listar(req: Request, res: Response) {
    try {
      const pedidos = await pedidoService.listar();
      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar pedidos" });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { cliente_id, produtos_ids } = req.body;

      if (!cliente_id || !produtos_ids || !Array.isArray(produtos_ids)) {
        return res.status(400).json({
          message: "cliente_id e produtos_ids (array) são obrigatórios",
        });
      }

      const pedido = await pedidoService.criar(Number(cliente_id), produtos_ids);
      res.status(201).json(pedido);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Erro ao criar pedido" });
    }
  }

  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, produtos_ids } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID do pedido é obrigatório" });
      }

      if (!status && (!produtos_ids || produtos_ids.length === 0)) {
        return res.status(400).json({
          message: "Informe ao menos o status ou os produtos_ids para atualizar",
        });
      }

      const pedidoAtualizado = await pedidoService.editar(Number(id), {
        status,
        produtos_ids,
      });

      if (!pedidoAtualizado) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      res.json(pedidoAtualizado);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message || "Erro ao editar pedido" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID do pedido é obrigatório" });
      }

      const pedidoDeletado = await pedidoService.deletar(Number(id));

      if (!pedidoDeletado) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      res.json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar pedido" });
    }
  }
}
