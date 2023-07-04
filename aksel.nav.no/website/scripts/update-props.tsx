import CoreDocs from "@navikt/ds-react/_docs.json";
import dotenv from "dotenv";

import { noCdnClient } from "../sanity/interface/client.server";

dotenv.config();

const ids: string[] = [];

const propList = (
  src: {
    displayName: string;
    filePath: string;
    props: {
      [key: string]: {
        defaultValue: any;
        description?: string;
        name: string;
        parent: any;
        declarations: any;
        required?: boolean;
        type?: any;
      };
    };
  }[],
  name: string
) =>
  src.map((prop) => {
    if (ids.includes(`${prop?.displayName?.toLowerCase()}_${name}_ds_props`)) {
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

const updateProps = async () => {
  const token = process.env.SANITY_WRITE_KEY;

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  propList(CoreDocs as any, "core").forEach((x) =>
    transactionClient.createOrReplace(x)
  );

  await transactionClient
    .commit()
    .then(() => console.log(`Updated props`))
    .catch((e) => console.error(e.message));
};

updateProps();
