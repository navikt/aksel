import dotenv from "dotenv";
import { noCdnClient } from "../../sanity/interface/client.server";
import { CodeExampleSchemaT } from "../../types";
import { extractMetadata } from "./parts/extract-metadata";
import { getDirectories } from "./parts/get-directories";
import { parseCodeFiles } from "./parts/parse-code-files";
import { RootDirectoriesT } from "./types";
dotenv.config();

const token = process.env.SANITY_WRITE_KEY;

if (!token) {
  throw new Error("Missing token 'SANITY_WRITE_KEY' for updating sanity");
}

updateSanity("templates", false);
updateSanity("eksempler", false);

export async function updateSanity(
  directory: RootDirectoriesT,
  isDryRun: boolean = false
) {
  const transactionClient = noCdnClient(token).transaction();
  const folders = getDirectories(directory);

  /* First we add/update examples */
  for (const folder of folders) {
    const data: CodeExampleSchemaT = {
      _id: createId(folder.path),
      _type: "kode_eksempler_fil",
      title: folder.path,
      variant: directory,
      filer: parseCodeFiles(folder.path, directory).map((x) => ({
        ...x,
        _key: x.navn.split(".")[0],
      })),
      metadata: extractMetadata(folder.path, directory),
    };

    transactionClient.createOrReplace(data);
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: isDryRun })
    .then(() => console.log(`Oppdaterte ${directory}-dokumenter i sanity`))
    .catch((e) => {
      throw new Error(e.message);
    });

  const oldSanityDocuments = await noCdnClient(token).fetch(
    `*[_type == "kode_eksempler_fil" && variant == "${directory}"]`
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
    .commit()
    .then(() => console.log(`Successfully deleted unused ${directory}`))
    .catch((e) => {
      /**
       * Errormessage includes all ids that failed.
       */
      deletedIds = deletedIds.filter((id) => e.message.includes(id));

      console.log("\n");
      console.log(
        `Found ${deletedIds.length} ${directory} documents longer documented locally, but referenced in sanity.
    How to fix:
    - Go to links provided under and try to manually delete document.
    - You will then be prompted to update referenced document before deleting.
    - After updating reference(s) and deleting document(s) there is no need to run the script again.`
      );
      console.log(
        JSON.stringify(
          deletedIds.map(
            (x) =>
              `https://aksel.nav.no/admin/prod/desk/admin;eksemplerTemplates;${x}`
          ),
          null,
          2
        )
      );
      throw new Error(
        `Failed when deleting old ${directory}-documentation from sanity, see warning above.`
      );
    });
}

function createId(s: string) {
  return `kode_eksempelid_${s.match(/\w/g)?.join("")}`.toLowerCase();
}
