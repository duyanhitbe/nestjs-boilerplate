FROM node:18-alpine as build

WORKDIR /app

#Install @nestjs/cli
RUN npm i -g @nestjs/cli
RUN npm i -g pnpm

#Install dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

#Build
COPY . .
RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]