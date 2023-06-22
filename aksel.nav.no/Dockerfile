FROM gcr.io/distroless/nodejs:18 as runtime

ENV NODE_ENV production

WORKDIR /app
COPY aksel.nav.no/website/.next/standalone ./
COPY aksel.nav.no/website/next-logger.config.js ./

ENV NODE_OPTIONS '-r next-logger'

EXPOSE 3000
CMD ["aksel.nav.no/website/server.js"]