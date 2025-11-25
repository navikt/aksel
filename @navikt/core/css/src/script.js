import fastglob from "fast-glob";
import fs from "node:fs";

const files = fastglob.sync("**/*.darkside.css", {
  cwd: ".",
});

for (const file of files) {
  fs.unlinkSync(file);
}
