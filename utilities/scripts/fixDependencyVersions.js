const glob = require("glob");
const fs = require("fs");
const extend = require("extend");
const utils = require("./utils");
const globalPackage = require("../../package.json");

const globalDeps = extend(
  {},
  globalPackage.devDependencies,
  globalPackage.dependencies
);

function getModules() {
  return new Promise((resolve, reject) => {
    glob("./packages/**/package.json", {}, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.filter((file) => file.indexOf("node_modules") === -1));
      }
    });
  });
}

function fixDependencies(pkg, section) {
  if (!pkg[section]) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  pkg[section] = utils
    .entries(pkg[section])
    .map((entry) => {
      const depName = entry.key;

      if (!globalDeps[depName]) {
        return entry;
      }

      return { key: depName, value: globalDeps[depName] };
    })
    .reduce((deps, entry) => extend(deps, { [entry.key]: entry.value }), {});
}

function addModuleVersions(files) {
  files.forEach((file) => {
    const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
    globalDeps[pkg.name] = `^${pkg.version}`;
  });
  return files;
}

function injectGlobalDependencies(files) {
  return files.map((file) => {
    const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));

    fixDependencies(pkg, "dependencies");
    fixDependencies(pkg, "devDependencies");
    fixDependencies(pkg, "peerDependencies");

    return {
      location: file,
      pkg,
    };
  });
}

function saveToDisk(modules) {
  modules.forEach((module) => {
    const location = module.location;
    const pkg = module.pkg;

    const content = `${JSON.stringify(pkg, null, 2)}\n`;

    fs.writeFileSync(location, content, "utf-8");
  });
}

getModules()
  .then(addModuleVersions)
  .then(injectGlobalDependencies)
  .then(saveToDisk)
  .catch((error) => {
    console.log("error", error); // eslint-disable-line no-console
  });
