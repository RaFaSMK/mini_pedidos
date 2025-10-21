import { Router } from "express";
import { ClienteController } from "../controllers/clienteController";

const router = Router()
const clienteController = new ClienteController()

router.get("/", (req, res) => clienteController.listar(req, res))
router.post("/", (req, res) => clienteController.criar(req, res))

export default router