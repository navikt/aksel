FROM denoland/deno:1.10.3 as runtime

ENV NODE_ENV production

WORKDIR /app
# should copy over .env created in github action
COPY scripts/article-views ./

USER deno
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./scripts/article-views/update-article-views.ts"]