# 1. Imagem base
FROM node:18-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copie os arquivos de dependência
COPY package.json package-lock.json ./

# 4. Instale TODAS as dependências (dev e prod)
#    Esta é a primeira correção!
RUN npm ci

# 5. Copie o schema do Prisma
COPY prisma ./prisma/

# 6. Gere o Prisma Client
RUN npx prisma generate

# 7. Copie o resto do código
COPY . .

# 8. Compile o TypeScript
RUN npm run build

# 9. Remova as dependências de desenvolvimento
#    Esta é a segunda correção! Limpa a imagem.
# RUN npm prune --production

# 10. Exponha a porta
EXPOSE 3001

# ... (todo o resto do arquivo)

# 11. Comando para iniciar
#    (Adiciona echos e executa o seed diretamente com tsx)
CMD [ "sh", "-c", "echo '>>> Running migrations...' && npx prisma migrate deploy && echo '>>> Running database seed...' && npx tsx scripts/prisma-seed.ts && echo '>>> Starting server...' && node dist/server.js" ]