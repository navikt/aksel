import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import tokens from "@navikt/ds-tokens/docs.json";
import core from "@navikt/ds-css/tokens.json";
import internal from "@navikt/ds-css-internal/tokens.json";

dotenv.config();

const allTokens: { title: string; kategori: string }[] = [
  ...Object.keys(tokens).map((x) => ({ title: x, kategori: "core" })),
  ...Object.keys(core).map((x) => ({ title: x, kategori: "comp" })),
  ...Object.keys(internal).map((x) => ({ title: x, kategori: "comp" })),
];

export const updateTokens = async () => {
  const token = process.env.SANITY_WRITE_KEY;

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  // first let's fetch the current state from sanity,
  // So that we can delete old/changed tokens
  const remoteTokens = await noCdnClient(token).fetch(
    `*[_type == "token_kategori"]`
  );

  for (const token of remoteTokens) {
    if (
      !allTokens.find(
        (x) => token._id === `${x.title.split("-").join("_")}_tokenkategori`
      )
    ) {
      transactionClient.delete(token._id);
    }
  }

  allTokens.forEach((c) =>
    transactionClient.createOrReplace({
      _id: `${c.title.split("-").join("_")}_tokenkategori`,
      _type: "token_kategori",
      ...c,
    })
  );

  await transactionClient
    .commit()
    .then(() => console.log(`Updated tokens`))
    .catch((e) => console.error(e.message));
};

updateTokens();
