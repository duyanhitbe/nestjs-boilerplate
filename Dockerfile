FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --ignore-scripts
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "start:prod" ]