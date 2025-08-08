# syntax=docker/dockerfile:1
FROM node:24-alpine AS base

# install dependencies
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# setup
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/public             ./public
COPY --from=builder /app/.next/standalone   ./
COPY --from=builder /app/.next/static       ./.next/static

# deploy
ENV PORT=7270
CMD ["node", "server.js"]
