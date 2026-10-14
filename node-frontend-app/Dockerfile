# -----------------------------
# Stage 1: Install dependencies
# -----------------------------
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev


# -----------------------------
# Stage 2: Production image
# -----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy production dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application
COPY package.json ./
COPY src ./src

# Application port
EXPOSE 3000

# Run as non-root user
USER node

CMD ["node", "src/server.js"]

