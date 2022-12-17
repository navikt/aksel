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
    `*[_type in ["ds_artikkel"] && defined(layout)]`
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = [];

  /* docs.forEach((data) => {
    data?.slug?.current
      ? newData.push({
          _id: data._id,
          kategori: "styling",
          slug_v2: {
            _type: "slug",
            current: data.slug.current.replace(
              "designsystem/side/",
              "grunnleggende/styling/"
            ),
          },
        })
      : console.log(data.heading);
  }); */

  /* for (const data of newData) {
    const id = data._id;
    delete data._id;
    transactionClient.patch(id, (p) =>
      p
        .set({ ...data })
        .unset(["metadata_feedback", "isMigrated", "artikkel_type"])
    );
  } */
  for (const doc of docs) {
    console.log(doc?.heading);
    transactionClient.patch(doc._id, (p) => p.unset(["layout"]));
  }
  /* transactionClient.create({
    _type: "redirect",
    source: `/tema`,
    destination: `/god-praksis`,
    permanent: true,
  });*/

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then((a) => console.log(`Updated! \n${JSON.stringify(a, null, 2)}`))
    .catch((e) => console.error(e.message));
};

main();
