FROM node:16-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn prisma generate
# UNCOMMENT THIS FOR PROD
# RUN yarn build

EXPOSE 5000

# COMMENT THIS FOR PROD
CMD ["yarn", "dev"]

# UNCOMMENT THIS FOR PROD
# CMD ["node", "dist/server.js"]