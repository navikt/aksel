import fs from "node:fs";
import path from "node:path";
import type {
  DocumentedEntry,
  Metadata,
} from "../../../@navikt/core/react/scripts/metadata/metadata.types";
import type { Ds_component_metadata } from "../app/_sanity/query-types";
import { noCdnClient } from "../sanity/interface/client.server";
import { findUnequalDocuments } from "./helpers/find-unequal-documents";

updateMetadata();

async function updateMetadata() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error("Missing token 'SANITY_WRITE' when updating metadata");
  }
  console.info("Updating metadata...");

  const newMetadataDocuments = metadataDocuments();
  const oldMetadataDocuments = await noCdnClient(token).fetch(
    `*[_type == "ds_component_metadata"]`,
  );

  const transactionClient = noCdnClient(token).transaction();

  let updatedCount = 0;

  const unequalDocuments = findUnequalDocuments({
    newDocuments: newMetadataDocuments,
    oldDocuments: oldMetadataDocuments,
    keysToCompare: [
      "_id",
      "_type",
      "dir",
      "keywords",
      "related",
      "components",
      "utils",
    ],
  });

  for (const doc of unequalDocuments) {
    transactionClient.createOrReplace(doc);
    updatedCount++;
  }

  if (updatedCount > 0) {
    await transactionClient
      .commit()
      .then(() =>
        console.info(
          `Successfully updated ${updatedCount} component metadata document(s)`,
        ),
      )
      .catch((e) => {
        throw new Error(e.message);
      });
  } else {
    console.info("No component metadata changes detected, skipping update");
  }

  let deletedIds: string[] = [];
  for (const prop of oldMetadataDocuments) {
    if (!newMetadataDocuments.find(({ _id }: any) => _id === prop._id)) {
      transactionClient.delete(prop._id);
      deletedIds.push(prop._id);
    }
  }

  if (deletedIds.length === 0) {
    console.info("No unused metadata found, skipping delete");
    return;
  }

  await transactionClient
    .commit()
    .then(() => console.info("Successfully deleted unused metadata"))
    .catch((e) => {
      /**
       * Errormessage includes all ids that failed.
       */
      deletedIds = deletedIds.filter((id) => e.message.includes(id));

      console.info("\n");
      console.info(
        `Found ${deletedIds.length} metadata entries no longer documented but still referenced.

    How to fix:
    - Go to links provided under and try to manually delete document.
    - You will then be prompted to update referenced document before deleting.
    - After updating reference(s) and deleting document(s) there is no need to run the script again.`,
      );
      console.info(
        JSON.stringify(
          deletedIds.map(
            (x) =>
              `https://aksel.nav.no/admin/desk/admin;componentMetadataAksel;${x}`,
          ),
          null,
          2,
        ),
      );
      throw new Error(
        "Failed when deleting old metadata from sanity, see warning above.",
      );
    });
}

function idCreator(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `doc_metadata_${cleaned}`;
}

type ComponentMetadata = Omit<
  Ds_component_metadata,
  "_rev" | "_createdAt" | "_updatedAt"
>;

function metadataDocuments(): ComponentMetadata[] {
  const metadataJson: Metadata = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), "../../@navikt/core/react/_metadata.json"),
      {
        encoding: "utf-8",
      },
    ),
  );

  const mappedMetadata: ComponentMetadata[] = [];

  for (const meta of metadataJson) {
    const _id = idCreator(meta.name);

    const metaDocument: ComponentMetadata = {
      _id,
      _type: "ds_component_metadata",
      name: meta.name,
      dir: meta.dir,
      keywords: meta.keywords,
      related: meta.related,
      components: meta.components.map((comp, idx) => ({
        _key: comp.displayName + idx,
        _type: "component",
        displayname: comp.displayName,
        filepath: comp.filePath,
        overridable: comp.overridable,
        props: unpackProps(comp.props),
      })),
      utils: meta.utils.map((comp, idx) => ({
        _key: comp.displayName + idx,
        _type: "util",
        displayname: comp.displayName,
        filepath: comp.filePath,
        overridable: comp.overridable,
        props: unpackProps(comp.props),
      })),
    };

    mappedMetadata.push(metaDocument);
  }

  return mappedMetadata;
}

function unpackProps(props: DocumentedEntry["props"]) {
  return Object.values(props).map((prop, idx2) => ({
    _key: prop.name + idx2,
    _type: "prop" as const,
    name: prop.name,
    defaultValue: prop.defaultValue?.value ?? null,
    description: prop.description,
    example: prop.example,
    params: prop.params,
    return: prop.return,
    required: prop.required,
    ref: prop.name === "ref",
    deprecated: prop.deprecated,
    type: prop.type.raw ?? prop.type.name,
    unpackedType:
      prop.type.name === "enum" && Array.isArray(prop.type.value)
        ? (prop.type.value as { value: string }[])
            .map((x) => x.value)
            .join(" | ")
        : undefined,
  }));
}
