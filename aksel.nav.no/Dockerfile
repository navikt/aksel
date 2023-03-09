FROM node:18.1-alpine3.14
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

WORKDIR /app
COPY aksel.nav.no/website/.next/standalone ./

EXPOSE 3000
CMD cd aksel.nav.no/website && node server.js