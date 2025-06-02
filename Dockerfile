FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npx prisma generate
RUN npm run build

FROM node:20-slim
WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "dist/src/server.js" ]
