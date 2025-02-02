FROM node:23.4-alpine3.20

RUN npm install -g pnpm

WORKDIR /studio
COPY package.json pnpm-lock.yaml .
RUN pnpm install

CMD ["pnpm", "dev"]
