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
    const parseName = (name) => {
      return `${name.toLowerCase().replaceAll(".", "-")}_${name}_ds_props`;
    };

    let dupe = false;
    if (ids.includes(parseName(prop.displayName))) {
      console.error(`Found duplicate id: ${parseName(prop.displayName)}`);
      dupe = true;
    }
    const id = parseName(prop.displayName);
    ids.push(id);

    return {
      _id: dupe ? `${id}_2` : id,
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

  const props = propList(CoreDocs as any, "core");

  // Preserve existing props that are not in the new list to allow documenting deprecated props
  /* const remoteProps = await noCdnClient(token).fetch(`*[_type == "ds_props"]`);

  for (const prop of remoteProps) {
    if (!props.find((x) => prop._id === x._id)) {
      transactionClient.delete(prop._id);
    }
  } */

  props.forEach((x) => transactionClient.createOrReplace(x));

  await transactionClient
    .commit()
    .then((e) => console.log(e))
    .catch((e) => console.error(e.message));
};

updateProps();
