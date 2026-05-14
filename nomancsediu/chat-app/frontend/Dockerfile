FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json next.config.ts postcss.config.mjs next-env.d.ts ./
COPY app ./app
COPY components ./components
COPY context ./context
COPY public ./public

ARG NEXT_PUBLIC_USER_SERVICE
ARG NEXT_PUBLIC_CHAT_SERVICE
ENV NEXT_PUBLIC_USER_SERVICE=${NEXT_PUBLIC_USER_SERVICE}
ENV NEXT_PUBLIC_CHAT_SERVICE=${NEXT_PUBLIC_CHAT_SERVICE}

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
