import fastglob from "fast-glob";
import fs from "node:fs";

const files = fastglob.sync("**/*.css", {
  cwd: ".",
});

for (const file of files) {
  const css = fs.readFileSync(`${file}`, "utf-8");

  fs.writeFileSync(file.replace("darkside.", ""), css);
}
