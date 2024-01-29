FROM denoland/deno:1.10.3

WORKDIR /app
# should copy over .env created in github action
COPY scripts/article-views ./

RUN chown -R deno:deno /app
USER deno
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./scripts/article-views/update-article-views.ts"]