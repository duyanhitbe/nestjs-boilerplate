FROM node:18-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
RUN npm i -g @nestjs/cli
COPY package.json .
COPY pnpm-lock.yaml .
COPY ./patches /app/patches
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
COPY . .

FROM base as dev
EXPOSE 3000

FROM base as prod
RUN pnpm build
RUN pnpm prune --prod --config.ignore-scripts=true
EXPOSE 3000
CMD ["pnpm", "start:prod"]