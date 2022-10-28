FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /app
COPY website/package.json .
COPY website/.next/ .next/
COPY website/public/ public
COPY website/.env .
COPY website/redirects.json .
COPY website/next.config.js .
COPY node_modules/ node_modules/

EXPOSE 3000
CMD yarn start