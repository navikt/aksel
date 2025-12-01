import { CodeExampleSchemaT } from "../../components/types";
import { noCdnClient } from "../../sanity/interface/client.server";
import { extractMetadata } from "./parts/extract-metadata";
import { getDirectories } from "./parts/get-directories";
import { parseCodeFiles } from "./parts/parse-code-files";
import { validateExamples } from "./parts/validate-examples";
import { RootDirectoriesT, rootDirectories } from "./types";

const isDryRun = process.argv.includes("--dry-run");

(async function () {
  for (const directory of rootDirectories) {
    await updateSanity(directory);
  }
})();

export async function updateSanity(directory: RootDirectoriesT) {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_WRITE' for updating code examples in Sanity",
    );
  }
  console.info(`Processing ${directory}`);
  const transactionClient = noCdnClient(token).transaction();
  const folders = getDirectories(directory);
  const exampleData: CodeExampleSchemaT[] = [];

  /* First we add/update examples */
  for (const folder of folders) {
    const data: CodeExampleSchemaT = {
      _id: createId(folder.path),
      _type: "kode_eksempler_fil",
      title: folder.path,
      variant: directory,
      filer: await parseCodeFiles(folder.path, directory),
      metadata: extractMetadata(folder.path, directory),
    };

    exampleData.push(data);
    transactionClient.createOrReplace(data);
  }

  if (!validateExamples(exampleData)) {
    throw new Error("TypeScript errors found in generated code, see above.");
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: isDryRun })
    .then(() => console.info(`Successfully updated ${directory}`))
    .catch((e) => {
      throw new Error(e.message);
    });

  const oldSanityDocuments = await noCdnClient(token).fetch(
    `*[_type == "kode_eksempler_fil" && variant == "${directory}"]`,
  );

  let deletedIds: string[] = [];
  /* Delete old examples */
  for (const document of oldSanityDocuments) {
    if (!folders.some((folder) => document._id === createId(folder.path))) {
      transactionClient.delete(document._id);
      deletedIds.push(document._id);
    }
  }

  await transactionClient
    .commit({ dryRun: isDryRun })
    .then(() => console.info(`Successfully deleted unused ${directory}`))
    .catch((e) => {
      /* The error message includes all ids that failed. */
      deletedIds = deletedIds.filter((id) => e.message.includes(id));

      console.info("\n");
      console.info(
        `Found ${deletedIds.length} ${directory} documents longer documented locally, but referenced in Sanity.
    How to fix:
    - Go to links provided under and try to manually delete document.
    - You will then be prompted to update referenced document before deleting.
    - After updating reference(s) and deleting document(s) there is no need to run the script again.`,
      );
      console.info(
        JSON.stringify(
          deletedIds.map(
            (x) =>
              `https://aksel.nav.no/admin/prod/desk/admin;eksemplerTemplates;${x}`,
          ),
          null,
          2,
        ),
      );
      throw new Error(
        `Failed when deleting old ${directory}-documentation from Sanity, see warning above.`,
      );
    });
}

function createId(s: string) {
  return `kode_eksempelid_${s.match(/\w/g)?.join("")}`.toLowerCase();
}
