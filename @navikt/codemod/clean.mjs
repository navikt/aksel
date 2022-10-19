import { deleteSync } from "del";

deleteSync([
  "utils/**/*.js",
  "bin/**/*.js",
  "transforms/**/*.js",
  "!transforms/**/__testfixtures__",
  "!transforms/**/tests/*.input.*",
  "!transforms/**/tests/*.output.*",
]);
