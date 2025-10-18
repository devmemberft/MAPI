FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json package-lock.json ./
COPY . . 

RUN npm install

COPY apps/backend ./apps/backend

WORKDIR /miselio/apps/backend
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /miselio/apps/backend/package.json ./
RUN npm install --only=production

EXPOSE 4000

CMD ["node", "dist/main"]
