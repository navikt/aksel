import { isEqual } from "lodash";
import { sanityClient } from "../../sanity/interface/client.server";

/**
 * Deep compare two sets of documents and return those that are unequal based on specified keys.
 */
function findUnequalDocuments({
  newDocuments,
  oldDocuments,
  keysToCompare,
}: {
  newDocuments: any[];
  oldDocuments: any[];
  keysToCompare: string[];
}) {
  const transationClient = sanityClient.transaction();
  const unequalDocuments: any[] = [];

  for (const newDocument of newDocuments) {
    const oldDocument = oldDocuments.find(
      (r: any) => r._id === newDocument._id,
    );

    /**
     * No old documents equal new document, so lets add it to the list for creation
     */
    if (!oldDocument) {
      unequalDocuments.push(newDocument);
      continue;
    }

    /**
     * Sanity transactions serializes documents, making changes to data (removing undefined, etc).
     * To get a correct comparison, we create a transaction for both documents, serialize them,
     * and compare the serialized versions based on the provided keys.
     */
    transationClient.create(oldDocument);
    transationClient.create(newDocument);

    /**
     * .create() just adds the documents within a `{ create: {...document} }`-wrapper
     */
    const [serializedOldMutation, serializedNewMutation] =
      transationClient.toJSON() as { create: any }[];

    /* Clean up transaction for next run */
    transationClient.reset();

    /**
     * When uploading/downloading documents, Sanity will modify the documents slightly.
     * Mainly line-breaks and some strings are modified.
     * local      : "type": "\\"medium\\" | \\"small\\"",\n'
     * from sanity: "type": "\\"medium\\" | \\"small\\""\n'
     *
     * Running JSON.stringify() on both documents normalizes these differences,
     * making the comparison more reliable.
     */
    const serializedOld = JSON.parse(
      JSON.stringify(serializedOldMutation.create),
    );
    const serializedNew = JSON.parse(
      JSON.stringify(serializedNewMutation.create),
    );

    for (const key of keysToCompare) {
      const hasOldKey = key in serializedOld;
      const hasNewKey = key in serializedNew;

      /* If key exists in only one document, they're unequal */
      if (hasOldKey !== hasNewKey) {
        console.info(`Key mismatch on document ${newDocument._id}: ${key}`);
        unequalDocuments.push(newDocument);
        break;
      }

      /* Skip if both don't exist */
      if (!hasOldKey && !hasNewKey) {
        continue;
      }

      /* If key exists in both, compare values */
      if (!isEqual(serializedOld[key], serializedNew[key])) {
        unequalDocuments.push(newDocument);
        break;
      }
    }
  }

  return unequalDocuments;
}

export { findUnequalDocuments };
