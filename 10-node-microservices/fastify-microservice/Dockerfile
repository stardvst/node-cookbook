FROM node:22

WORKDIR "/app"

RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

COPY package*.json ./

RUN npm install --production

FROM node:22-slim

WORKDIR "/app"

RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

COPY --from=0 /app/node_modules /app/node_modules
COPY . /app

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

USER node

CMD ["npm", "start"]
