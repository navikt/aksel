const {
  schemaExtractor,
  generateSchemaTypes,
} = require("@sanity-codegen/schema-codegen");
const fs = require("fs");
const path = require("path");

async function main() {
  const normalizedSchema = await schemaExtractor({
    schemaPath: "./schemas/schema.ts",
    babelOptions: {
      plugins: [
        [
          "mock-imports",
          {
            redirects: [
              {
                pattern: "@/lib",
                location: path.resolve(__dirname, "./lib/index.ts"),
              },
              {
                pattern: "@navikt/ds-css",
                location: path.resolve(__dirname, "./schema-mock.tsx"),
              },
            ],
          },
        ],
      ],
    },
  });

  const typescriptSource = await generateSchemaTypes({
    normalizedSchema,
    generateTypeName: (x) => {
      return x === "code" || x === "powerTable" ? "any" : x;
    },
  });

  await fs.promises.writeFile(
    "../website/lib/types/schema.d.ts",
    `${typescriptSource}\nexport default SanityT;\n`.replace(
      "declare namespace Sanity",
      "declare namespace SanityT"
    )
  );
}

main();
