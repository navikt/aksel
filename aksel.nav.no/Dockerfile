FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim

WORKDIR /app
COPY aksel.nav.no/website/.next/standalone ./
COPY aksel.nav.no/website/next-logger.config.js ./

ENV NODE_ENV=production
ENV NODE_OPTIONS='-r next-logger'

EXPOSE 3000
CMD ["aksel.nav.no/website/server.js"]