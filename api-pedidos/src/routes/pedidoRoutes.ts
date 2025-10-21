import { Router } from "express";
import { PedidoController } from "../controllers/pedidoController";

const router = Router()
const pedidoController = new PedidoController()

router.get("/", (req, res) => {pedidoController.listar(req, res)})
router.post("/", (req, res) => {pedidoController.criar(req, res)})

export default router