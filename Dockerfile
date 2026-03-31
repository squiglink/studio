# Builder stage
FROM oven/bun:1.3.11-alpine AS builder
ARG VITE_BASE_SERVER_URL=https://server.squiglink.com
ARG VITE_CLOUDFLARE_TURNSTILE_ENABLED=true
ARG VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=build-time-secret

ENV VITE_BASE_SERVER_URL=${VITE_BASE_SERVER_URL} \
    VITE_CLOUDFLARE_TURNSTILE_ENABLED=${VITE_CLOUDFLARE_TURNSTILE_ENABLED} \
    VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=${VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}

WORKDIR /studio
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun vue-tsc --noEmit && bun vite build

# Production stage
FROM node:23.4-alpine3.20 AS production-runner

RUN npm install -g http-server

WORKDIR /studio

COPY --from=builder /studio/dist /studio

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
