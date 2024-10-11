import core from "@navikt/ds-css/tokens.json";
import tokens from "@navikt/ds-tokens/docs.json";
import { noCdnClient } from "../sanity/interface/client.server";

const allTokens: { title: string; kategori: string }[] = [
  ...Object.keys(tokens).map((x) => ({ title: x, kategori: "core" })),
  ...Object.keys(core).map((x) => ({ title: x, kategori: "comp" })),
];

export const updateTokens = async () => {
  const writeKey = process.env.SANITY_WRITE;
  if (!writeKey) {
    throw new Error(
      "Missing token 'SANITY_WRITE' when updating token-documentation",
    );
  }

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(writeKey).transaction();

  // first let's fetch the current state from sanity,
  // So that we can delete old/changed tokens
  const remoteTokens = await noCdnClient(writeKey).fetch(
    `*[_type == "token_kategori"]`,
  );

  for (const token of remoteTokens) {
    if (
      !allTokens.find(
        (x) => token._id === `${x.title.split("-").join("_")}_tokenkategori`,
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
    }),
  );

  await transactionClient
    .commit()
    .then(() => console.info(`Updated tokens!`))
    .catch((e) => console.error(e.message));
};

updateTokens();
