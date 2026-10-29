
# Stage 1: Install production dependencies
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force


# Stage 2: Production runtime
FROM node:20-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Run the application as the built-in non-root node user
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json server.js ./

USER node

EXPOSE 3001

CMD ["node", "server.js"]
