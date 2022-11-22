import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import CoreDocs from "@navikt/ds-react/_docs.json";
import InternalDocs from "@navikt/ds-react-internal/_docs.json";
import NavnoDocs from "@navikt/ds-navno/_docs.json";
import { SanityT } from "..";

dotenv.config();

const ids = [];

const propList = (src: any, name: string): SanityT.Schema.ds_props[] =>
  src.map((prop) => {
    if (ids.includes(`${prop.displayName.toLowerCase()}_${name}_ds_props`)) {
      console.error(
        `Found duplicate id: ${`${prop.displayName.toLowerCase()}_${name}_ds_props`}`
      );
    }
    ids.push(`${prop.displayName.toLowerCase()}_${name}_ds_props`);

    return {
      _id: `${prop.displayName.toLowerCase()}_${name}_ds_props`,
      _type: "ds_props",
      title: prop.displayName,
      displayname: prop.displayName,
      filepath: prop.filePath,
      proplist: Object.values(prop.props as unknown).map((val, y) => {
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

const updateProps = async () => {
  const token = process.env.SANITY_WRITE_KEY;

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  propList(CoreDocs, "core").forEach((x) =>
    transactionClient.createOrReplace(x)
  );
  propList(InternalDocs, "internal").forEach((x) =>
    transactionClient.createOrReplace(x)
  );
  propList(NavnoDocs, "navno").forEach((x) =>
    transactionClient.createOrReplace(x)
  );

  await transactionClient
    .commit()
    .then(() => console.log(`Updated props`))
    .catch((e) => console.error(e.message));
};

updateProps();
