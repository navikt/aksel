import fs from "fs";
import jscodeshift from "jscodeshift";

const j = jscodeshift.withParser("ts");
const file = "src/util/i18n/locales/nb.ts";
const backup = "scripts/nb.backup";

function addJsdoc() {
  if (fs.existsSync(backup)) {
    // If last build failed, we need to restore the file so that we don't create duplicate JSDoc
    console.info(
      `WARNING: Restoring backup of ${file} - Uncommitted changes will be lost!`,
    );
    fs.copyFileSync(backup, file);
  }

  fs.copyFileSync(file, backup); // Create a copy of the original file that we can restore afterwards

  const code = fs.readFileSync(file, "utf-8");
  const parsedCode = j(code);
  const defaultExport = parsedCode.find(j.ExportDefaultDeclaration);
  const keys = defaultExport.find(j.ObjectProperty);
  keys
    .filter((key) => key.value.value.type === "StringLiteral")
    .forEach((key) => {
      // @ts-expect-error It works, doesn't it?
      const value = key.value.value.value;
      const foundCommentBlock = key.value.comments?.find(
        (comment) => comment.type === "CommentBlock",
      );
      if (foundCommentBlock) {
        foundCommentBlock.value = `${foundCommentBlock.value}\n* @default "${value}" `;
      } else {
        key.value.comments = [
          ...(key.value.comments || []),
          {
            type: "CommentBlock",
            value: `* @default "${value}" `,
            leading: true,
            trailing: false,
          },
        ];
      }
    });

  const modifiedCode = parsedCode.toSource();
  fs.writeFileSync(file, modifiedCode);
}

function cleanup() {
  fs.copyFileSync(backup, file);
  fs.unlinkSync(backup);
}

if (process.argv.includes("--cleanup")) {
  cleanup();
} else {
  addJsdoc();
}
