FROM denoland/deno:1.40.2

WORKDIR /app
RUN chown -R deno:deno /app
USER deno

COPY ./deps.ts .
RUN deno cache deps.ts

# should copy over .env created in github action
COPY . .
RUN deno cache update-article-views/main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./update-article-views/main.ts"]