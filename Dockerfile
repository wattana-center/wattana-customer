# FROM node:alpine AS builder

# WORKDIR /build
# ENV NODE_OPTIONS=--max_old_space_size=2048
# COPY . .
# COPY /prod/.env ./
# RUN yarn install
# RUN yarn build

# FROM node:alpine as runner

# WORKDIR /usr/app

# # Launch app with PM2
# # RUN npm install -g npm@8.1.4y
# # RUN npm install -g --unsafe-perm pm2
# # ENV PM2_PUBLIC_KEY 2spkozrik9i90iz
# # ENV PM2_SECRET_KEY z5uvwy0w3e0c3q8

# COPY --from=builder /build/.env ./
# COPY --from=builder /build/package.json /build/yarn.lock ./
# COPY --from=builder /build/.next ./.next/
# COPY --from=builder /build/public ./public/
# COPY --from=builder /build/next.config.js ./
# COPY --from=builder /build/node_modules ./node_modules

# EXPOSE 3000

# # Run container as non-root (unprivileged) user
# # The "node" user is provided in the Node.js Alpine base image
# # USER node

# # CMD [ "pm2-runtime", "start", "yarn", "--name", '"web"', "--", "start"]

# CMD ["yarn", "start"]

FROM node:alpine AS build

WORKDIR /app

COPY ./package.json .
RUN npm install
COPY . .
COPY /prod/.env ./
RUN npm run build

FROM node:alpine AS runner

WORKDIR /app

COPY --from=build /app /app
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 2spkozrik9i90iz
ENV PM2_SECRET_KEY z5uvwy0w3e0c3q8

EXPOSE 3000
CMD ["pm2-runtime", "start", "npm", "--", "start"]