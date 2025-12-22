import fs from "node:fs";
import path from "node:path";
import { noCdnClient } from "../sanity/interface/client.server";

updateProps();

async function updateProps() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_WRITE' when updating prop-documentation",
    );
  }

  const transactionClient = noCdnClient(token).transaction();

  const props = propList();

  if (checkIfDuplicateExists(propList().map((x: any) => x._id))) {
    throw new Error(
      "Duplicate _id found for prop-list. This should not be possible...",
    );
  }

  props.forEach((x) => {
    transactionClient.createOrReplace(x);
  });

  await transactionClient
    .commit()
    .then(() => console.info("Successfully updated prop-documentation"))
    .catch((e) => {
      throw new Error(e.message);
    });

  const remoteProps = await noCdnClient(token).fetch(`*[_type == "ds_props"]`);

  let deletedIds: string[] = [];
  for (const prop of remoteProps) {
    if (!props.find(({ _id }: any) => _id === prop._id)) {
      transactionClient.delete(prop._id);
      deletedIds.push(prop._id);
    }
  }

  await transactionClient
    .commit()
    .then(() => console.info("Successfully deleted unused prop-documents"))
    .catch((e) => {
      /**
       * Errormessage includes all ids that failed.
       */
      deletedIds = deletedIds.filter((id) => e.message.includes(id));

      console.info("\n");
      console.info(
        `Found ${deletedIds.length} prop definitions no longer documented.
    This could be caused by moving file-location of prop-definition, a namechange or simply not existing anymore.

    How to fix:
    - Go to links provided under and try to manually delete document.
    - You will then be prompted to update referenced document before deleting.
    - After updating reference(s) and deleting document(s) there is no need to run the script again.`,
      );
      console.info(
        JSON.stringify(
          deletedIds.map(
            (x) =>
              `https://aksel.nav.no/admin/prod/desk/admin;propsDesignsystemet;${x}`,
          ),
          null,
          2,
        ),
      );
      throw new Error(
        "Failed when deleting old prop-documentation from sanity, see warning above.",
      );
    });
}

function propList() {
  const CoreDocs = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), "../../@navikt/core/react/_docs.json"),
      {
        encoding: "utf-8",
      },
    ),
  );

  return CoreDocs.map((prop: any) => {
    const _id = `${hashString(prop.displayName)}_${hashString(prop.filePath)}`;

    return {
      _id,
      _type: "ds_props",
      title: prop.displayName,
      displayname: prop.displayName,
      filepath: prop.filePath,
      proplist: Object.values(prop.props).map((val: any, y) => {
        return {
          _type: "prop",
          _key: val.name + y,
          name: val.name,
          defaultValue: val.defaultValue?.value ?? null,
          description: val.description,
          example: val.example,
          params: val.params,
          return: val.return,
          required: val.required,
          type: val.type.name,
          ref: val.name === "ref",
          deprecated: val.deprecated,
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
