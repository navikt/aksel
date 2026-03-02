import { DocumentActionComponent, definePlugin } from "sanity";
import { setLastVerified } from "./actions/lastVerified";

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

        if (shouldUseQualityControl) {
          newActions = newActions.reduce((prev, originalAction) => {
            if (originalAction.action === "publish") {
              prev.push(setLastVerified(originalAction));
            } else {
              prev.push(originalAction);
            }
            return prev;
          }, [] as DocumentActionComponent[]);

          return newActions;
        }

        return newActions;
      },
    },
  };
});
