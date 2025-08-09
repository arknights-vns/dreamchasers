# syntax=docker/dockerfile:1
FROM node:24-alpine AS base

# install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# setup
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/public             ./public
COPY --from=builder /app/.next/standalone   ./
COPY --from=builder /app/.next/static       ./.next/static

# deploy
ENV NODE_ENV=production
ENV PORT=7270
CMD ["node", "server.js"]
