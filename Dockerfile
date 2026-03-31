# Base

FROM oven/bun:1.3.11-alpine AS base

WORKDIR /studio

# Development

FROM base AS development

CMD ["bun", "vite"]

# Production

FROM base AS production

ARG VITE_BASE_SERVER_URL=https://server.squiglink.com
ARG VITE_CLOUDFLARE_TURNSTILE_ENABLED=true
ARG VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=build-time-secret

ENV VITE_BASE_SERVER_URL=${VITE_BASE_SERVER_URL}
ENV VITE_CLOUDFLARE_TURNSTILE_ENABLED=${VITE_CLOUDFLARE_TURNSTILE_ENABLED}
ENV VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=${VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile && bun add --global serve

COPY . .
RUN bun vue-tsc --noEmit && bun vite build

CMD ["serve", "dist", "--single", "--listen", "8080"]
