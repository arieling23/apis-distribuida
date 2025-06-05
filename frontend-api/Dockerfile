FROM node:18-alpine

WORKDIR /app

# Copiar dependencias y construir
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Exponer y servir en el puerto 3000
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
