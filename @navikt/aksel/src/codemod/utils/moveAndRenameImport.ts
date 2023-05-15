import core, { Collection } from "jscodeshift";

export default function moveAndRenameImport(
  j: core.JSCodeshift,
  root: Collection<any>,
  {
    fromImport,
    toImport,
    fromName,
    toName,
  }: { fromImport: string; toImport: string; fromName: string; toName: string }
) {
  const existingFromImport = root.find(j.ImportDeclaration, {
    source: {
      value: fromImport,
    },
  });

  if (!existingFromImport.length) {
    return null;
  }

  let localname = fromName;
  const existingFromImportSpecifier = existingFromImport?.find(
    j.ImportSpecifier,
    (node) => {
      if (node.imported.name === fromName) {
        localname = node.local.name;
      }
      return node.imported.name === fromName;
    }
  );

  if (!existingFromImport.length || !existingFromImportSpecifier?.length) {
    return null;
  }

  if (existingFromImportSpecifier?.length > 0) {
    existingFromImportSpecifier.remove();
  }

  if (
    !existingFromImport.get("specifiers").value?.length ||
    existingFromImport.get("specifiers").value?.length === 0
  ) {
    existingFromImport.remove();
  }

  const existingImport = root.find(j.ImportDeclaration, {
    source: {
      value: toImport,
    },
  });

  const existingImportSpecifier = existingImport.find(j.ImportSpecifier, {
    imported: {
      name: toName,
    },
  });

  if (existingImportSpecifier.length <= 0) {
    const newImportSpecifier = j.importSpecifier(j.identifier(toName));

    if (existingImport.length > 0) {
      existingImport.get("specifiers").push(newImportSpecifier);
    } else {
      const newImport = j.importDeclaration(
        [newImportSpecifier],
        j.stringLiteral(toImport)
      );

      const lastImport = root.find(j.ImportDeclaration).at(-1);

      if (lastImport.length > 0) {
        lastImport.insertAfter(newImport);
      } else {
        root.get().node.program.body.unshift(newImport);
      }
    }
  }

  return localname;
}

/* root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react-internal")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (x.imported.name === "CopyToClipboard") {
          if (x.local.name !== x.imported.name) {
            localName = x.local.name;
            x.imported.name = "CopyButton";
          } else {
            x.imported.name = "CopyButton";
            x.local.name = "CopyButton";
          }
        }
      });
    }); */
