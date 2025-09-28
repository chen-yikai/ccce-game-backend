FROM oven/bun:1 AS base

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "run", "index.ts"]