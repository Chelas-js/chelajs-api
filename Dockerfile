FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS build
COPY . .
RUN bun install
RUN bun run build

FROM base AS build-dev-deps
COPY . .
RUN bun install --frozen-lockfile --production

FROM base AS publish
COPY package.json bun.lock .
COPY --from=build /usr/src/app/dist dist
COPY --from=build-dev-deps /usr/src/app/node_modules node_modules
ENV PORT 3000
EXPOSE 3000
CMD bun run start:prod
