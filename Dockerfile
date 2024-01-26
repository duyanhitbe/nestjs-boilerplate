FROM node:18-alpine as build

WORKDIR /app

#Install @nestjs/cli
RUN npm i -g @nestjs/cli

#Install dependencies
COPY package.json .
RUN yarn

#Build
COPY . .
RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000

CMD ["yarn", "start:prod"]