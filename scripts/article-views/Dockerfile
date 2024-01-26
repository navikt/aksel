FROM denoland/deno:1.10.3 as runtime

ENV NODE_ENV production

WORKDIR /app
# should copy over .env created in github action
COPY scripts/article-views ./

CMD ["./scripts/article-views/update-article-views.ts"]