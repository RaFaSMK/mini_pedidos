import { Router } from "express";
import { PedidoController } from "../controllers/pedidoController";

const router = Router()
const pedidoController = new PedidoController()

router.get("/", (req, res) => { pedidoController.listar(req, res) })
router.post("/", (req, res) => { pedidoController.criar(req, res) })
router.put("/:id", (req, res) => { pedidoController.editar(req, res) })
router.delete("/:id", (req, res) => { pedidoController.deletar(req, res) })

export default router