FROM gcr.io/distroless/nodejs:20 as runtime

ENV NODE_ENV production

WORKDIR /app
COPY scripts/article-views ./

EXPOSE 3000
CMD ["article-views/update-article-views/main.ts"]