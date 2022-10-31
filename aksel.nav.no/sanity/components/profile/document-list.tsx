import React from "react";
import Preview from "part:@sanity/base/preview";
import { IntentLink } from "part:@sanity/base/router";
import schema from "part:@sanity/base/schema";
import {
  Item as DefaultItem,
  List as DefaultList,
} from "part:@sanity/components/lists/default";
import styles from "./profile.css";

const ReferringDocumentsList = (props) => {
  const { documents } = props;
  return (
    <DefaultList className={styles.root}>
      {documents
        .sort(
          (a, b) =>
            new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime()
        )
        .map((document) => {
          const schemaType = schema.get(document._type);
          return (
            <DefaultItem key={document._id} className={styles.item}>
              {schemaType ? (
                <IntentLink
                  className={styles.link}
                  intent="edit"
                  params={{ id: document._id, type: document._type }}
                >
                  <Preview value={document} type={schemaType} />
                  {document._updatedAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </IntentLink>
              ) : (
                <div>
                  A document of the unknown type <em>{document._type}</em>
                </div>
              )}
            </DefaultItem>
          );
        })}
    </DefaultList>
  );
};

export default ReferringDocumentsList;
