import { Router } from "express";
import { ClienteController } from "../controllers/clienteController";

const router = Router()
const clienteController = new ClienteController()

router.get("/", (req, res) => clienteController.listar(req, res))
router.get("/:id", (req, res) => clienteController.buscarPorId(req, res))
router.post("/", (req, res) => clienteController.criar(req, res))
router.put("/:id", (req, res) => clienteController.editar(req, res))
router.delete("/:id", (req, res) => clienteController.deletar(req, res))

export default router