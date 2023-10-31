import dotenv from "dotenv";
import { noCdnClient } from "../../sanity/interface/client.server";
import { getDirectories } from "./parts/get-directories";
import { parseCodeFiles } from "./parts/parse-code-files";
import { RootDirectoriesT } from "./types";
dotenv.config();

const createId = (s: string) =>
  `kode_eksempelid_${s
    .match(/\w/g)
    ?.join("")
    ?.match(/\D/g)
    ?.join("")}`.toLowerCase();

const token = process.env.SANITY_WRITE_KEY;

if (!token) {
  throw new Error("Missing token 'SANITY_WRITE_KEY' for updating sanity");
}

/* await updateSanity("eksempler"); */
await updateSanity("templates", true);

export async function updateSanity(
  directory: RootDirectoriesT,
  isDryRun: boolean = false
) {
  const transactionClient = noCdnClient(token).transaction();
  const folders = getDirectories(directory);

  const oldSanityDocuments = await noCdnClient(token).fetch(
    `*[_type == "kode_${directory}_fil"]`
  );

  /* Delete old examples */
  for (const document of oldSanityDocuments) {
    if (!folders.some((folder) => document._id === createId(folder.path))) {
      transactionClient.delete(document._id);
    }
  }

  for (const folder of folders) {
    const data = {
      _id: createId(folder.path),
      _type: `kode_${directory}_fil`,
      title: folder.path,
      dir: true, // legacy
      filer: parseCodeFiles(folder.path, directory),
    };
    console.log(data);

    transactionClient.createOrReplace(data);
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: isDryRun })
    .then(() => console.log(`Oppdaterte ${directory}-dokumenter i sanity`))
    .catch((e) => console.error(e.message));
}
