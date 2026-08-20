# Multi-stage build for Moflix (Next.js 15)
FROM node:22-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_BASE_URL
ARG TMDB_BASE_URL
ARG API_KEY
ARG BEARER_TOKEN
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV TMDB_BASE_URL=$TMDB_BASE_URL
ENV API_KEY=$API_KEY
ENV BEARER_TOKEN=$BEARER_TOKEN
RUN npm run build

# Runner stage
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3003

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Reinstall only production deps
RUN npm ci --only=production --legacy-peer-deps

EXPOSE 3003
CMD ["npm", "start"]
