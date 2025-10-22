import { Router } from "express";
import { ProdutoController } from "../controllers/produtoController";

const router = Router()
const produtoController = new ProdutoController()

router.get("/", (req, res) => produtoController.listar(req, res))
router.post("/", (req, res) => produtoController.criar(req, res))
router.put("/:id", (req, res) => produtoController.editar(req, res))
router.delete("/:id", (req, res) => produtoController.deletar(req, res))

export default router