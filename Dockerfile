# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /api

# Copiamos los archivos de configuración y dependencias
COPY package*.json ./

# Instalamos dependencias de desarrollo
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos (asumiendo que usas TypeScript y "build" compila a dist/)
#RUN npm run build


# Etapa de producción
#FROM node:22-alpine

#WORKDIR /app

# Copiamos solo lo necesario desde el builder
#COPY --from=builder /app/dist ./dist
#COPY --from=builder /app/package.json ./

# Instalamos solo dependencias de producción
#RUN npm install --only=production

# Exponemos el puerto
EXPOSE 1908

# Comando por defecto
#CMD ["node", "dist/main"]
CMD ["npm", "run", "start:dev"]