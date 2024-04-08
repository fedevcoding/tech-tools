FROM node:20.11.0

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN yarn install

# Copy the rest of the files
COPY . .

ENV NEXT_PUBLIC_SERVER_URL "http://localhost:3000"

RUN yarn build

CMD ["yarn", "start"]