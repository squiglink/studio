FROM node:23.4-alpine3.20

RUN npm install -g pnpm

WORKDIR /studio
COPY . .
RUN pnpm install

CMD ["pnpm", "dev"]