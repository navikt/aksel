import { loadCsf } from "@storybook/csf-tools";
import { readFileSync } from "fs";

module.exports = (indexers) => {
  const csfIndexer = async (fileName: string, opts) => {
    const code = readFileSync(fileName, "utf-8").toString();
    return loadCsf(code, { ...opts, fileName }).parse();
  };

  const exampleIndexer = async (fileName: string, opts) => {
    let code = readFileSync(fileName, "utf-8").toString();

    code = code.replace("export const args =", "const args =");

    code += `\nexport default { title: "Eksempler/${fileName
      .split("pages/eksempler/")[1]
      .replace(".tsx", "")}"  };\n`;

    return loadCsf(code, { ...opts, fileName }).parse();
  };

  return [
    ...(indexers || []),
    {
      test: /(stories|story)\.[tj]sx?$/,
      indexer: csfIndexer,
    },
    {
      test: /pages\/eksempler\/|(".+")|(.+.tsx)$/,
      indexer: exampleIndexer,
    },
  ];
};
