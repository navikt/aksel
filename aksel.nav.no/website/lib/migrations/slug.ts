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
    data?.slug?.current &&
    data?.slug?.current.startsWith("artikkel/") &&
    (!data?.slug_v2 || data?.slug_v2?.current !== data?.slug?.current)
      ? newData.push({
          _id: data._id,
          old: data.slug.current,
          slug: {
            _type: "slug",
            current: data.slug.current.replace(
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
    transactionClient.create({
      _type: "redirect",
      source: `/${data.old}`,
      destination: `/${data.slug.current}`,
      permanent: true,
    });
    console.log({
      _type: "redirect",
      source: `/${data.old}`,
      destination: `/${data.slug.current}`,
      permanent: true,
    });
    delete data.old;
    transactionClient.patch(id, (p) =>
      p.set({ ...data }).unset(["slug_v2", "isMigrated"])
    );
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then((a) => console.log(`Updated! \n${JSON.stringify(a, null, 2)}`))
    .catch((e) => console.error(e.message));
};

main();
