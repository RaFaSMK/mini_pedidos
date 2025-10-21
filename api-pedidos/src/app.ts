import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import clienteRoutes from './routes/clienteRoutes'
import produtoRoutes from './routes/produtoRoutes'
import pedidoRoutes from "./routes/pedidoRoutes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/clientes", clienteRoutes)
app.use("/produtos", produtoRoutes)
app.use("/pedidos", pedidoRoutes)

app.get("/", (req, res) => {
  res.send("Api rodando!")
})

export default app;