FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instalar dependências
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]