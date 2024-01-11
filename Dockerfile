## BASE
FROM node:lts-alpine as base

## BUILDER
FROM base as builder

# Create app directory
WORKDIR /app

RUN export NODE_ENV=production

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY schema.prisma ./schema.prisma
COPY migrations ./migrations

# Install build dependencies
RUN npm install

COPY . .

RUN npx next experimental-compile

## RUNNER
FROM base

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/migrations/ ./migrations
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder /app/.next/static ./.next/static

RUN npm install -g prisma@$(node -pe "require('./package.json').dependencies.prisma")

RUN rm package*.json

# migrate and start app
CMD prisma migrate deploy && node server.js