import CoreDocs from "@navikt/ds-react/_docs.json";
import dotenv from "dotenv";

import { noCdnClient } from "../sanity/interface/client.server";

dotenv.config();

updateProps();

async function updateProps() {
  const token = process.env.SANITY_WRITE_KEY;

  const transactionClient = noCdnClient(token).transaction();

  const props = propList();

  if (checkIfDuplicateExists(propList().map((x) => x._id))) {
    throw new Error(
      "Duplicate _id found for prop-list. This should not be possible..."
    );
  }

  props.forEach((x) => transactionClient.createOrReplace(x));

  await transactionClient
    .commit({ dryRun: true })
    .then(() => console.log("Successfully updated prop-documentation"))
    .catch((e) => {
      throw new Error(e.message);
    });

  const remoteProps = await noCdnClient(token).fetch(`*[_type == "ds_props"]`);

  const deletedIds: string[] = [];
  for (const prop of remoteProps) {
    if (!props.find(({ _id }) => _id === prop._id)) {
      transactionClient.delete(prop._id);
      deletedIds.push(prop._id);
    }
  }

  if (deletedIds.length > 0) {
    console.log("\n");
    console.log(
      `Found prop ${deletedIds.length} definitions no longer documented.
This could be caused by moving file-location of prop-definition, a namechange or simply not existing anymore.

How to fix:
- Go to links provided under and try to manually delete document.
- You will then be prompted to update referenced document before deleting.
- After updating reference(s) and deleting document(s) there is no need to run the script again.`
    );
    console.log(
      JSON.stringify(
        deletedIds.map(
          (x) =>
            `https://aksel.nav.no/admin/prod/desk/admin;propsDesignsystemet;${x}`
        ),
        null,
        2
      )
    );
  }

  await transactionClient
    .commit({ dryRun: true })
    .then(() => console.log("Successfully deleted unused prop-documents"))
    .catch(() =>
      console.error(
        "Failed deleting still referenced document(s). See previous warning for fix."
      )
    );
}

function propList() {
  return CoreDocs.map((prop) => {
    const _id = `${hashString(prop.displayName)}_${hashString(prop.filePath)}`;

    return {
      _id,
      _type: "ds_props",
      title: prop.displayName,
      displayname: prop.displayName,
      filepath: prop.filePath,
      proplist: Object.values(prop.props).map((val, y) => {
        return {
          _type: "prop",
          _key: val.name + y,
          name: val.name,
          defaultValue: val.defaultValue?.value ?? null,
          description: val.description,
          required: val.required,
          type: val.type.name,
          ref: val.name === "ref",
        };
      }),
    };
  });
}

function hashString(str: string) {
  let output = 1;
  for (let i = 0; i < str.length; i++) {
    output *= str[i].charCodeAt(0);
    output %= Number.MAX_SAFE_INTEGER;
  }

  return output;
}

function checkIfDuplicateExists(arr: string[]) {
  return new Set(arr).size !== arr.length;
}
