FROM gcr.io/distroless/nodejs24-debian12

WORKDIR /app
COPY v7-aksel.nav.no/website/.next/standalone ./
COPY v7-aksel.nav.no/website/next-logger.config.js ./

ENV NODE_ENV=production

EXPOSE 3000
CMD ["v7-aksel.nav.no/website/server.js"]