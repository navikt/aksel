FROM denoland/deno:1.10.3

WORKDIR /app
RUN chown -R deno:deno /app
USER deno

# should copy over .env created in github action
COPY scripts/article-views ./
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./scripts/article-views/update-article-views/main.ts"]