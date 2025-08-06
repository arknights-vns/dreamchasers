# syntax=docker/dockerfile:1

# install dependencies
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# setup
FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public             ./public
COPY --from=builder /app/.next/standalone   ./
COPY --from=builder /app/.next/static       ./.next/static

# deploy
ENV PORT=7270
ENV NODE_ENV=production
CMD ["node", "server.js"]
