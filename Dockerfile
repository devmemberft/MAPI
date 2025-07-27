FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN npm install

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/main"]
