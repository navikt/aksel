/**
 * Migration template
 */

import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import { customAlphabet } from "nanoid/non-secure";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

/* Key-function used by sanity */
const randKey = () => {
  const nanoid = customAlphabet("1234567890abcdef", 12);
  return nanoid();
};

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transactionClient = noCdnClient(token).transaction();

  const docs = await noCdnClient(token).fetch(`*[_type in ["aksel_artikkel"]]`);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = [];

  docs.forEach((data) => {
    data?.slug?.current && data?.slug?.current.startsWith("artikkel/")
      ? newData.push({
          _id: data._id,
          slug_v2: {
            _type: "slug",
            current: data?.slug?.current.replace(
              "artikkel/",
              "god-praksis/artikler/"
            ),
          },
        })
      : console.log(data.heading);
  });

  for (const data of newData) {
    const id = data._id;
    delete data._id;
    transactionClient.patch(id, (p) => p.set({ ...data }));
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then(() => console.log(`Updated!`))
    .catch((e) => console.error(e.message));
};

main();
