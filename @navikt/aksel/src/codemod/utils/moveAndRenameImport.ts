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
  const existingImport = root.find(j.ImportDeclaration, {
    source: {
      value: toImport,
    },
  });

  if (!existingImport.length) {
    return;
  }

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

  const existingFromImport = root.find(j.ImportDeclaration, {
    source: {
      value: fromImport,
    },
  });

  if (!existingFromImport.length) {
    return;
  }

  const existingFromImportSpecifier = existingFromImport?.find(
    j.ImportSpecifier,
    {
      imported: {
        name: fromName,
      },
    }
  );

  if (existingFromImportSpecifier?.length > 0) {
    existingFromImportSpecifier.remove();
  }

  if (existingFromImport.get("specifiers").length === 0) {
    existingFromImport.remove();
  }
}
