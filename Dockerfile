FROM node:lts-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./

RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

ARG NEXT_PUBLIC_SERVER_URL

ENV NEXT_PUBLIC_SERVER_URL $NEXT_PUBLIC_SERVER_URL
ENV NODE_ENV production

RUN yarn run build

CMD ["yarn", "start"]