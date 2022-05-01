FROM node:16.3 as build

WORKDIR /app
ARG API_URL

# Install NPM modules
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

# Compile react code
COPY [".babelrc", "webpack.config.js", "./"]
COPY src/ ./src
COPY public/ ./public
RUN npm run production

## Stage Two
## Build our webserver
FROM node:16.3 as server

WORKDIR /app
EXPOSE 5001/tcp

# install node_modules
COPY server.package.json ./package.json
RUN npm install

COPY ["index.js", "index.html", "./"]

COPY --from=build /app/public ./public

CMD ["npm", "run", "start"]