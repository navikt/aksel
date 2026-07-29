FROM gcr.io/distroless/nodejs24-debian13

ENV NODE_ENV=production

WORKDIR /app

COPY apps/mcp-server/dist ./


EXPOSE 8080
CMD ["index.mjs"]