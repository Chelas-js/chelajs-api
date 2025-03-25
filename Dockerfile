FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS build
COPY . .
RUN bun install
RUN bun run build

FROM base AS build-dev-deps
COPY --from=build /usr/src/app/package.json /usr/src/app
COPY --from=build /usr/src/app/bun.lock /usr/src/app
RUN bun install --frozen-lockfile --production

FROM base AS publish
COPY --from=build /usr/src/app/package.json /usr/src/app
COPY --from=build /usr/src/app/bun.lock /usr/src/app
COPY --from=build /usr/src/app/dist dist
COPY --from=build-dev-deps /usr/src/app/node_modules node_modules
ENV PORT 3000
EXPOSE 3000
CMD bun run start:prod
