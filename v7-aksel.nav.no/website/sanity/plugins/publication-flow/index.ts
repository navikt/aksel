import { DocumentActionComponent, definePlugin } from "sanity";
import { allArticleDocuments } from "@/sanity/config";
import { forcedPublishActions } from "./actions/forcedPublish";
import {
  setLastVerified,
  setLastVerifiedWithoutPublish,
} from "./actions/lastVerified";
import { setPublishedAt } from "./actions/publishedAt";

/**
 * Plugin that adds customized publication flow to documents.
 * For document-types that require a quality check before publishing, it adds a dialog for the user to confirm the publish action.
 * For remaining documents in 'allArticleDocuments', it sets the publishedAt field to the current date on first publish.
 */
export const publicationFlow = definePlugin(() => {
  return {
    name: "publication-flow",
    document: {
      actions: (originalActions, context) => {
        let newActions = originalActions;

        const shouldUseQualityControl = [
          "komponent_artikkel",
          "ds_artikkel",
          "aksel_artikkel",
        ].some((docType) => docType === context.schemaType);

        const shouldSetPublishedAt = allArticleDocuments.some(
          (docType) => docType === context.schemaType,
        );

        if (shouldUseQualityControl) {
          newActions = newActions.reduce((prev, originalAction) => {
            if (originalAction.action === "publish") {
              prev.push(setLastVerified(originalAction));
              prev.push(forcedPublishActions(originalAction));
              prev.push(setLastVerifiedWithoutPublish(context));
            } else {
              prev.push(originalAction);
            }
            return prev;
          }, [] as DocumentActionComponent[]);

          return newActions;
        }

        if (!shouldSetPublishedAt) {
          return newActions;
        }

        return newActions.map((originalAction) => {
          if (originalAction.action === "publish") {
            return setPublishedAt(originalAction);
          }
          return originalAction;
        });
      },
    },
  };
});
