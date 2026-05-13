# Base

FROM node:26-alpine3.23 AS base

RUN npm install --global pnpm@^11.1.0

WORKDIR /studio

# Development

FROM base AS development

CMD ["pnpm", "vite"]

# Production

FROM base AS production

ARG VITE_BASE_LAB_URL=https://squig.link
ARG VITE_BASE_SERVER_URL=https://server.squiglink.com
ARG VITE_CLOUDFLARE_TURNSTILE_ENABLED=true
ARG VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=build-time-secret

ENV VITE_BASE_LAB_URL=${VITE_BASE_LAB_URL}
ENV VITE_BASE_SERVER_URL=${VITE_BASE_SERVER_URL}
ENV VITE_CLOUDFLARE_TURNSTILE_ENABLED=${VITE_CLOUDFLARE_TURNSTILE_ENABLED}
ENV VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=${VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile && npm install -g serve

COPY . .
RUN pnpm vue-tsc --noEmit && pnpm vite build

CMD ["serve", "dist", "--single", "--listen", "8080"]
