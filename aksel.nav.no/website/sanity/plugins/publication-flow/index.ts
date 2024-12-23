import { DocumentActionComponent, definePlugin } from "sanity";
import { allArticleDocuments } from "@/sanity/config";
import {
  createWrappedApproveAction,
  createWrappedFocusAction,
  createWrappedUpdateAction,
} from "./actions";
import { setPublishedAt } from "./actions/publishedAt";

const getCustomActions = (prev: DocumentActionComponent[]) => {
  const defaultActions = prev.map((action) => {
    if (action.action === "publish") {
      return createWrappedFocusAction(action);
    }
    return action;
  });

  const customActions = [
    defaultActions[0],
    createWrappedApproveAction(),
    createWrappedUpdateAction(),
  ];
  return [...customActions, ...defaultActions.slice(1)];
};

export const publicationFlow = definePlugin(() => {
  const hasQualityControl = [
    "komponent_artikkel",
    "ds_artikkel",
    "aksel_artikkel",
  ];
  const hasPublishedAt = allArticleDocuments;

  return {
    name: "publication-flow",
    document: {
      actions: (originalActions, context) => {
        const newActions = originalActions;

        if (
          hasQualityControl.some((docType) => docType === context.schemaType)
        ) {
          return getCustomActions(newActions);
        }

        const shouldSetPublishedAt = hasPublishedAt.some(
          (docType) => docType === context.schemaType,
        );

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
