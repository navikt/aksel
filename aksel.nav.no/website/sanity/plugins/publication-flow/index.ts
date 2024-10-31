import {
  DocumentActionComponent,
  DocumentBadgeComponent,
  definePlugin,
} from "sanity";
import { allArticleDocuments } from "@/sanity/config";
import {
  createWrappedApproveAction,
  createWrappedDefaultPublish,
  createWrappedFocusAction,
  createWrappedUpdateAction,
} from "./actions";
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

const withCustomPublishAction = (prev: DocumentActionComponent[]) => {
  return [createWrappedDefaultPublish(prev[0]), ...prev.slice(1)];
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
      actions: (prev, { schemaType }) => {
        if (hasQualityControl.some((docType) => docType === schemaType)) {
          return getCustomActions(prev);
        }

        if (hasPublishedAt.some((docType) => docType === schemaType)) {
          return withCustomPublishAction(prev);
        }

        return prev;
      },
      badges: (prev, { schemaType }) => {
        if (hasQualityControl.some((docType) => docType === schemaType)) {
          return generateBadges(prev);
        }
        return prev;
      },
    },
  };
});
