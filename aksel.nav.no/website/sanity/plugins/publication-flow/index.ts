import {
  DocumentActionComponent,
  DocumentBadgeComponent,
  definePlugin,
} from "sanity";
import { allArticleDocuments } from "@/sanity/config";
import {
  createWrappedApproveAction,
  createWrappedFocusAction,
  createWrappedUpdateAction,
} from "./actions";
import { createPublishWithDateAction } from "./actions/createPublishWithDateAction";
import { CreateStatusBadge, createBadgeComponent } from "./badges";

const generateBadges = (prev: DocumentBadgeComponent[]) => {
  const defaultBadges = prev.map((badge: DocumentBadgeComponent) => {
    return createBadgeComponent(badge);
  });
  return [...defaultBadges, CreateStatusBadge()];
};

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
      actions: (prev, context) => {
        if (
          hasQualityControl.some((docType) => docType === context.schemaType)
        ) {
          return getCustomActions(prev);
        }

        if (hasPublishedAt.some((docType) => docType === context.schemaType)) {
          return prev.map((originalAction) =>
            originalAction.action === "publish"
              ? createPublishWithDateAction(originalAction)
              : originalAction,
          );
        }

        return prev;
      },
      badges: (prev, context) => {
        if (
          hasQualityControl.some((docType) => docType === context.schemaType)
        ) {
          return generateBadges(prev);
        }
        return prev;
      },
    },
  };
});
