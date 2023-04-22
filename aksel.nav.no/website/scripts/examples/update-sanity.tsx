import dotenv from "dotenv";
import { readExampleFile, readExampleFiles } from ".";
import { noCdnClient } from "../../sanity/interface/client.server";
import { getExampleFiles } from "./get-example-files";
dotenv.config();

const createId = (s: string) =>
  `kode_eksempelid_${s
    .match(/\w/g)
    ?.join("")
    ?.match(/\D/g)
    ?.join("")}`.toLowerCase();

const main = async () => {
  const token = process.env.SANITY_WRITE_KEY;
  const transactionClient = noCdnClient(token).transaction();
  const examples = getExampleFiles();

  const docs = await noCdnClient(token).fetch(
    `*[_type == "kode_eksempler_fil"]`
  );

  /* Delete fremoved examples */
  for (const doc of docs) {
    if (!examples.some((x) => doc._id === createId(x.path))) {
      transactionClient.delete(doc._id);
    }
  }

  for (const ex of examples) {
    const data = {
      _id: createId(ex.path),
      _type: "kode_eksempler_fil",
      title: ex.path,
      dir: ex.dir,
      filer: ex.dir ? readExampleFiles(ex.path) : [readExampleFile(ex.path)],
    };

    transactionClient.createOrReplace(data);
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true })
    .then(() => console.log(`Oppdaterte kode-eksempler`))
    .catch((e) => console.error(e.message));
};

main();
