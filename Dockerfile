## BASE
FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json package-lock.json ./

## BUILDER
FROM base as builder
RUN export NODE_ENV=production
RUN npm install

COPY . .
RUN npx prisma generate
RUN npx next experimental-compile

## RUNNER
FROM base as prod

WORKDIR /app

RUN rm package.json && rm package-lock.json
RUN npm install prisma --save-dev

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/migrations/ ./migrations
COPY --from=builder --chown=nextjs:nodejs /app/schema.prisma ./schema.prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/deploy/migrate-and-start.sh ./migrate-and-start.sh

USER nextjs

CMD ["bash", "migrate-and-start.sh"]