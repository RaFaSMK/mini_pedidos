import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/produtoRoutes';
import pedidoRoutes from './routes/pedidoRoutes';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';      
import YAML from 'yaml';   
import path from 'path'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

try {
  const openApiPath = path.resolve(process.cwd(), 'openapi.yaml');
  const file = fs.readFileSync(openApiPath, 'utf8');
  const swaggerDocument = YAML.parse(file); 

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Documentação Swagger disponível em /api-docs`);

} catch (error) {
  console.error("Erro ao carregar ou parsear o arquivo openapi.yaml:", error);
}

app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Api rodando!');
});

export default app;