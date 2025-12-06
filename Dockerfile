# Builder stage
FROM node:23.4-alpine3.20 AS builder
ARG VITE_BASE_API_URL=https://api.squiglink.com
ARG VITE_CLOUDFLARE_TURNSTILE_ENABLED=true
ARG VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=build-time-secret

ENV VITE_BASE_API_URL=${VITE_BASE_API_URL} \
    VITE_CLOUDFLARE_TURNSTILE_ENABLED=${VITE_CLOUDFLARE_TURNSTILE_ENABLED} \
    VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=${VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}

RUN npm install -g pnpm

WORKDIR /studio
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production stage
FROM node:23.4-alpine3.20 AS production-runner

RUN npm install -g http-server

WORKDIR /studio

COPY --from=builder /studio/dist /studio

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
