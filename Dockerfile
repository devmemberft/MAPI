FROM node:18-alpine AS builder

WORKDIR /backend

COPY package*.json package-lock.json ./
COPY . . 

RUN npm install

COPY backend ./backend

WORKDIR /miselio/backend
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /backend

COPY --from=builder /miselio/backend/dist ./dist
COPY --from=builder /miselio/backend/package.json ./
COPY --from=builder /miselio/package.json ./
RUN npm install --only=production

EXPOSE 1908

CMD ["node", "dist/main"]
