FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS development
COPY . .
CMD ["sh", "-c", "npm run db:dev && npm run start:dev"]

FROM deps AS builder
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./dist/generated
ENV NODE_ENV=production
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
