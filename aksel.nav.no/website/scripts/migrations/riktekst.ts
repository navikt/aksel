/**
 * Migration template
 */

import dotenv from "dotenv";
import { noCdnClient } from "../../sanity/interface/client.server";

dotenv.config();
const token = process.env.SANITY_WRITE_KEY;

const randKey = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStyle = (text: string, style: string) => ({
  _key: randKey(),
  _type: "block",
  style,
  markDefs: [],
  children: [
    {
      _type: "span",
      marks: [],
      text,
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transform = (src: any, type?: string) => {
  const newData = [];

  let copy: any[] = [];
  try {
    copy = JSON.parse(JSON.stringify(src));
  } catch (error) {
    console.log(src);
    throw new Error("Invalid data");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  copy.forEach((data) => {
    /* switch (data._type) {
      case "datatype":
        newData.push(data);
        break;
      default:

      throw new Error("Found type without transform!")
        console.log(data);
        break;
    } */
  });
  return newData;
};

/*

const docs = await noCdnClient(token).fetch(
    `*[_type in ["komponent_artikkel","ds_artikkel","aksel_artikkel","aksel_prinsipp","aksel_blogg","aksel_standalone"]]`
  );
*/

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transactionClient = noCdnClient(token).transaction();

  const docs = await noCdnClient(token).fetch(
    `*[_type in ["komponent_artikkel"]]`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = [];

  docs.forEach((data) => {
    switch (data._type) {
      case "aksel_artikkel":
        break;
      case "aksel_prinsipp":
        break;
      case "aksel_blogg":
        break;
      case "aksel_standalone":
        break;
      case "ds_artikkel":
        break;
      case "komponent_artikkel":
        /* data.bruk_tab &&
          newData.push({
            _id: data._id,
            content: data.bruk_tab.map((x) => ({ ...x, _key: randKey() })),
          }); */
        break;
      default:
        break;
    }
  });

  /* for (const data of newData) {
    const id = data._id;
    delete data._id;
    transactionClient.patch(id, (p) => p.set({ ...data }).unset(["bruk_tab"]));
  }

  await transactionClient
    .commit({ autoGenerateArrayKeys: true, dryRun: true })
    .then(() => console.log(`Updated!`))
    .catch((e) => console.error(e.message)); */
};

main();
