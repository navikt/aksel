/**
 * Migration template
 */
import dotenv from "dotenv";
import { noCdnClient } from "../../sanity/interface/client.server";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

/* const randKey = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}; */

const main = async () => {
  const transactionClient = noCdnClient(token).transaction();

  const docs = await noCdnClient(token).fetch(
    `*[_type in ["ds_artikkel", "komponent_artikkel"]]`,
  );

  docs.forEach((data) => {
    transactionClient.patch(data._id, (p) => p.unset(["slug_v2"]));
  });

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then((a) => console.info(`Updated! \n${JSON.stringify(a, null, 2)}`))
    .catch((e) => console.error(e.message));
};

main();
