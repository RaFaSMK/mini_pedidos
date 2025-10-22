import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.pedidoProduto.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.produto.deleteMany();
});
afterAll(async () => {
  await prisma.$disconnect();
});

describe('API de Clientes - /api/clientes', () => {

  it('GET / - Deve retornar status 200 e um array vazio inicialmente', async () => {
    const response = await request(app).get('/api/clientes');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });

  it('POST / - Deve criar um novo cliente e retornar status 201 com os dados do cliente', async () => {
    const novoCliente = {
      nome: 'Cliente de Teste',
      email: 'teste@exemplo.com',
    };

    const response = await request(app)
      .post('/api/clientes')
      .send(novoCliente);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoCliente.nome);
    expect(response.body.email).toBe(novoCliente.email);

    const clienteNoBanco = await prisma.cliente.findUnique({
      where: { email: novoCliente.email },
    });
    expect(clienteNoBanco).not.toBeNull(); 
    expect(clienteNoBanco?.nome).toBe(novoCliente.nome);
  });

  it('POST / - Deve retornar status 400 se o email já existir', async () => {
    await prisma.cliente.create({
      data: { nome: 'Duplicado Teste', email: 'duplicado@exemplo.com' },
    });

    const clienteComEmailRepetido = {
      nome: 'Outro Cliente',
      email: 'duplicado@exemplo.com', 
    };

    const response = await request(app)
      .post('/api/clientes')
      .send(clienteComEmailRepetido);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Email já cadastrado');
  });

   it('POST / - Deve retornar status 400 se faltar nome ou email', async () => {
    const clienteSemEmail = { nome: 'Só Nome' };

    const response = await request(app)
      .post('/api/clientes')
      .send(clienteSemEmail);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Nome e email são obrigatórios'); 
  });


  it('GET /:id - Deve retornar status 200 e os dados do cliente específico', async () => {
    const clienteCriado = await prisma.cliente.create({
      data: { nome: 'Cliente Busca', email: 'busca@exemplo.com' },
    });

    const response = await request(app).get(`/api/clientes/${clienteCriado.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(clienteCriado.id);
    expect(response.body.nome).toBe(clienteCriado.nome);
    expect(response.body.email).toBe(clienteCriado.email);
    expect(response.body).toHaveProperty('pedidos');
    expect(response.body.pedidos).toBeInstanceOf(Array);
  });

  it('GET /:id - Deve retornar status 404 se o cliente não existir', async () => {
    const idInexistente = 99999;
    const response = await request(app).get(`/api/clientes/${idInexistente}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Cliente não encontrado');
  });

});