var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function (value) {
              step("next", value);
            },
            function (err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

const Octokat = require("octokat");
const crypto = require("crypto");
const fileType = require("file-type");
const mime = require("mime-types");
const path = require("path");
const minimatch = require("minimatch");

exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* (
    { boundActionCreators },
    { user, repository, tree = false, releases = false, branch, secrets = {} }
  ) {
    if (!user || !repository) {
      throw new Error(
        "You need to define user & repository for gatsby-source-github to work"
      );
    }

    const octo = new Octokat(secrets);
    const createNode = boundActionCreators.createNode;

    console.time(`fetch Github data`);
    secrets.token && console.log("Using Github Token");
    console.log(
      `starting to fetch data from the Github API. Warning: This may take a long time.`
    );

    const repo = octo.repos(user, repository);

    if (tree) {
      const patternFilter = function patternFilter(file) {
        return minimatch(file.path, (tree && tree.pattern) || "**");
      };
      const data = yield repo.git
        .trees(branch ? branch : "HEAD")
        .fetch({ recursive: 1 });

      const files = yield Promise.all(
        data.tree
          .filter(function (file) {
            return file.type !== "tree";
          })
          .filter(patternFilter)
          .map(function (file) {
            return octo
              .fromUrl(file.url)
              .fetch()
              .then(function (result) {
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

      files.forEach(function (file) {
        return createNode(
          _extends({}, file, {
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
      });
    }

    if (releases) {
      const data = yield repo.releases.fetch();

      data.items.forEach(function (item) {
        createNode(
          _extends({}, item, {
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
          })
        );
      });
    }

    console.timeEnd(`fetch Github data`);

    return;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
