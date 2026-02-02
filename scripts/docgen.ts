import fg from "fast-glob";
import { writeFileSync } from "node:fs";
import * as docgen from "react-docgen-typescript";

export interface ComponentDoc extends docgen.ComponentDoc {
  props: {
    [key: string]: docgen.PropItem & {
      // Extra fields added during enrichment
      example?: string;
      params?: string[];
      return?: string;
      deprecated?: string;
    };
  };
}

const options: docgen.ParserOptions = {
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,

  propFilter: (prop) => {
    if (prop.name === "as" && prop.type.name === "undefined") {
      return false;
    }
    if (prop.name === "className" || prop.parent?.name === "RefAttributes") {
      return true;
    }
    if (prop.parent?.fileName.includes("/node_modules/@types/react/")) {
      return false;
    }

    /**
     * Filter out all HTML attributes inherited from React.HTMLAttributes
     * className is handled separately above
     */
    if (prop.parent?.name === "HTMLAttributes") {
      return false;
    }

    return true;
  },
};

const tsConfigParser = docgen.withCustomConfig(`./tsconfig.esm.json`, options);

const enrich_extra_prop_fields = (docs: ComponentDoc[]) => {
  for (const doc of docs) {
    for (const prop of Object.values(doc.props)) {
      if (!prop.description) {
        continue;
      }
      const example_regex = /@example((.|\n)*?(?=@[a-z]+\s))|@example((.|\n)*)/;
      const example = prop.description.match(example_regex);
      prop.description = prop.description.replace(example_regex, "");
      // We replace twice as a hack b.c. 'asChild' ends up with two @example-blocks,
      // probably b.c. it's defined two times (discriminated union, see AsChildProps.ts)
      prop.description = prop.description.replace(example_regex, "").trim();
      if (example?.[1] || example?.[3]) {
        prop.example = (example[1] || example[3]).trim();
      }

      const params_regex = /(@param|@argument|@arg)(.*)/g;
      const params = prop.description.match(params_regex);
      prop.description = prop.description.replace(params_regex, "").trim();
      if (params) {
        prop.params = params.map((param) =>
          param.replace(/@param|@argument|@arg/, "").trim(),
        );
      }

      const return_regex = /(@returns?)(.*)/;
      const _return = prop.description.match(return_regex);
      prop.description = prop.description.replace(return_regex, "").trim();
      if (_return) {
        const return_val = _return[2].replace(/@returns?/, "").trim();
        prop.return = return_val ? return_val : "void";
      }

      const link_regex = /@see {@link (http[^ ]+) ([^}]+)}/;
      prop.description = prop.description.replace(link_regex, "[$2]($1)");

      const deprecation_regex = /(@deprecated?)(.*)/;
      const deprecation = prop.description.match(deprecation_regex);
      prop.description = prop.description.replace(deprecation_regex, "").trim();
      if (deprecation) {
        const return_val = deprecation[2].replace(/@deprecated?/, "").trim();
        prop.deprecated = return_val;
      }
    }
  }
};

const genDocs = () => {
  const files = fg
    .sync([`./src/**/*.tsx`, "!**/*.stories.*", "!**/*.test.*", "!**/stories"])
    .filter(
      (x) =>
        !x.toLowerCase().includes("illustration") &&
        !x.toLowerCase().includes("pictogram"),
    );

  const res: ComponentDoc[][] = [];
  const fails: string[] = [];

  files.forEach((file) => {
    const doc = tsConfigParser.parse(file);
    enrich_extra_prop_fields(doc);
    if (doc.length > 0) {
      res.push(doc);
    } else {
      fails.push(file);
    }
  });

  console.info({ Documented: res.length, fails });

  const cleaned = res.flat().map((file) => ({
    filePath: file.filePath,
    displayName: file.displayName,
    props: file.props,
  }));

  writeFileSync(`_docs.json`, JSON.stringify(cleaned, null, 2));
};

genDocs();
