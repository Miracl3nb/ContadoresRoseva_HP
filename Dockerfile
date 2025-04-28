# Usa Node 18 + Debian Slim
FROM node:18-bullseye-slim

# Instala herramientas necesarias
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Crea la carpeta de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json si existe
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto de la app
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]