#!/bin/bash

# Initializing a base image
FROM node:18-alpine AS base

# Stage 1: Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn --production=false



# Stage 2: Build the application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build


# Stage 3: Serve the production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# necessary files for production runner
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/node_modules/ ./node_modules

# necessary files for db migration
COPY --from=builder /app/package.json/ ./package.json
COPY --from=builder /app/ormconfig.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src/migrations/ ./src/migrations

ENV \
PG_HOST= \
PG_USER= \
PG_PASSWORD= \
PG_PORT= \
PG_DB= \
API_PORT= \
GLOBAL_PREFIX= \
JWT_SECRET= \
JWT_EXPIRATION_TIME=

USER nestjs

EXPOSE $PORT

ENV PORT 4000

CMD ["node", "dist/src/main"]