FROM gcr.io/distroless/nodejs24-debian12

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --chown=nextjs:nodejs aksel.nav.no/website/.next/standalone ./
COPY --chown=nextjs:nodejs aksel.nav.no/website/next-logger.config.js ./

ENV NODE_ENV=production
ENV NODE_OPTIONS='-r next-logger'

USER nextjs

EXPOSE 3000
CMD ["aksel.nav.no/website/server.js"]