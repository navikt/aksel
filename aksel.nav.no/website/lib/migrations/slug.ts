/**
 * Migration template
 */

import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

const randKey = () => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transactionClient = noCdnClient(token).transaction();

  const docs = await noCdnClient(token).fetch(
    `*[_type in ["ds_artikkel", "komponent_artikkel"]]`
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = [];

  docs.forEach((data) => {
    if (data?.slug_v2?.current) {
      newData.push({
        _id: data._id,
        slug: data.slug_v2,
      });
      if (!data._id.includes("draft")) {
        transactionClient.create({
          _type: "redirect",
          source: `/${data.slug.current}`,
          destination: `/${data.slug_v2.current}`,
          permanent: true,
        });
      }
    } else {
      console.log(data.heading);
    }
  });

  for (const data of newData) {
    const id = data._id;
    delete data._id;
    transactionClient.patch(id, (p) => p.set({ ...data }));
  }

  /* transactionClient.create({
    _type: "redirect",
    source: `/designsystem`,
    destination: `/`,
    permanent: true,
  }); */

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then((a) => console.log(`Updated! \n${JSON.stringify(a, null, 2)}`))
    .catch((e) => console.error(e.message));
};

main();
