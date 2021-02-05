const zipdir = require("zip-dir");

const zipDir = async (dir, name) => {
  await zipdir(dir, { saveTo: name }, function (err, buffer) {
    if (err) {
      console.error(err);
    }
  });
};

try {
  zipDir("./png/", "NAV-ikonpakke-png.zip");
  zipDir("./svg/", "NAV-ikonpakke-svg.zip");
} catch (e) {
  console.error(e);
}
