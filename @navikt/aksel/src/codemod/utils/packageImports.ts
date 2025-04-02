import core, { Collection, JSCodeshift } from "jscodeshift";

// add import declaration after first existing import declaration, or
// at the beginning of the file
export const addPackageImport = ({
  j,
  root,
  packageName,
  specifiers,
}: {
  j: JSCodeshift;
  root: Collection<any>;
  packageName: string;
  specifiers: string[];
}) => {
  const existingImport = root.find(j.ImportDeclaration);

  const importDecl = j.importDeclaration(
    specifiers.map((specifier) => j.importSpecifier(j.identifier(specifier))),
    j.stringLiteral(packageName),
  );

  if (existingImport.length === 0) {
    root.get().node.program.body.unshift(importDecl);
  } else {
    existingImport.insertBefore(importDecl);
  }
};

export default function moveAndRenameImport(
  j: core.JSCodeshift,
  root: Collection<any>,
  {
    fromImport,
    toImport,
    fromName,
    toName,
    ignoreAlias = false,
  }: {
    fromImport: string;
    toImport: string;
    fromName: string;
    toName: string;
    ignoreAlias?: boolean;
  },
) {
  /* Does package-name exist */
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
    },
  );

  if (!existingFromImport.length || !existingFromImportSpecifier?.length) {
    return null;
  }

  if (existingFromImportSpecifier?.length > 0) {
    existingFromImportSpecifier.remove();
  }

  /* Remove import if its now empty */
  if (
    !existingFromImport.get("specifiers").value?.length ||
    existingFromImport.get("specifiers").value?.length === 0
  ) {
    existingFromImport.remove();
  }

  /* Does package exist */
  const existingImport = root.find(j.ImportDeclaration, {
    source: {
      value: toImport,
    },
  });

  /* Check if migrated name allready exist */
  const existingImportSpecifier = existingImport.find(j.ImportSpecifier, {
    imported: {
      name: toName,
    },
  });

  if (existingImportSpecifier.length <= 0) {
    const newImportSpecifier = ignoreAlias
      ? j.importSpecifier(j.identifier(toName))
      : j.importSpecifier(j.identifier(toName), j.identifier(localname));

    if (existingImport.length > 0) {
      existingImport.get("specifiers").push(newImportSpecifier);
    } else {
      const newImport = j.importDeclaration(
        [newImportSpecifier],
        j.stringLiteral(toImport),
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
