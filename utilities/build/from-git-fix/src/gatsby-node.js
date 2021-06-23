const Octokat = require("octokat");
const crypto = require("crypto");
const fileType = require("file-type");
const mime = require("mime-types");
const path = require("path");
const minimatch = require("minimatch");

exports.sourceNodes = async (
  { boundActionCreators },
  { user, repository, tree = false, releases = false, secrets = {} }
) => {
  if (!user || !repository) {
    throw new Error(
      "You need to define user & repository for gatsby-source-github to work"
    );
  }

  const octo = new Octokat(secrets);
  const { createNode } = boundActionCreators;

  console.time(`fetch Github data`);
  secrets.token && console.log("Using Github Token");
  console.log(
    `starting to fetch data from the Github API. Warning: This may take a long time.`
  );

  const repo = octo.repos(user, repository);

  if (tree) {
    const patternFilter = (file) =>
      minimatch(file.path, (tree && tree.pattern) || "**");
    const data = await repo.git.trees("HEAD").fetch({ recursive: 1 });

    const files = await Promise.all(
      data.tree
        .filter((file) => file.type !== "tree")
        .filter(patternFilter)
        .map((file) => {
          return octo
            .fromUrl(file.url)
            .fetch()
            .then((result) => {
              const buffer = Buffer.from(result.content, "base64");
              const type = fileType(buffer);
              const mimeType = type
                ? type.mime
                : mime.lookup(file.path) || "plaintext";

              return {
                user: user,
                repository: repository,
                path: file.path,
                fileAbsolutePath: file.url,
                relativePath: file.path,
                base: path.basename(file.path),
                relativeDirectory: path.dirname(file.path),
                url: file.url,
                type: file.type,
                mime: mimeType,
                sha: file.sha,
                content: buffer.toString("utf8"),
              };
            });
        })
    );

    files.forEach((file) =>
      createNode({
        ...file,
        id: file.url,
        parent: `__SOURCE__`,
        children: [],
        internal: {
          mediaType: file.mime,
          type: "GithubFile",
          contentDigest: crypto
            .createHash(`md5`)
            .update(file.content)
            .digest(`hex`),
        },
      })
    );
  }

  if (releases) {
    const data = await repo.releases.fetch();

    data.items.forEach((item) => {
      createNode({
        ...item,
        id: item.url,
        parent: null,
        children: [],
        internal: {
          type: "GithubRelease",
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(item))
            .digest(`hex`),
        },
      });
    });
  }

  console.timeEnd(`fetch Github data`);

  return;
};
