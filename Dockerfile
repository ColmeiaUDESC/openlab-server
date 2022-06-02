FROM node:16-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn prisma generate
RUN yarn build

EXPOSE 5000

CMD ["node", "dist/server.js"]