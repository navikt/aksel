import {
  DocumentActionComponent,
  DocumentBadgeComponent,
  definePlugin,
} from "sanity";
import { allArticleDocuments } from "@/sanity/config";
import {
  createWrappedApproveAction,
  createWrappedDefaultPublish,
  createWrappedDeleteAction,
  createWrappedDiscardChangesAction,
  createWrappedDuplicateAction,
  createWrappedFocusAction,
  createWrappedRestoreAction,
  createWrappedUnpublishAction,
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
    if (action.action === "unpublish") {
      return createWrappedUnpublishAction(action);
    }
    if (action.action === "delete") {
      return createWrappedDeleteAction(action);
    }
    if (action.action === "duplicate") {
      return createWrappedDuplicateAction(action);
    }
    if (action.action === "restore") {
      return createWrappedRestoreAction(action);
    }
    if (action.action === "discardChanges") {
      return createWrappedDiscardChangesAction(action);
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

interface PublicationFlowOptions {
  hasQualityControl: string[];
  hasPublishedAt: string[];
}

export const publicationFlowConfig = definePlugin<PublicationFlowOptions>(
  ({ hasQualityControl, hasPublishedAt }) => ({
    name: "publication-flow",
    document: {
      actions: (prev, { schemaType, currentUser }) => {
        if (hasQualityControl.some((e) => e === schemaType)) {
          return getCustomActions(prev);
        } else if (hasPublishedAt.some((e) => e === schemaType)) {
          return withCustomPublishAction(prev);
        } else if (schemaType === "aksel_feedback") {
          return currentUser?.roles.find((x) => x.name === "developer")
            ? prev
            : [prev[0]];
        }

        return prev;
      },
      badges: (prev, { schemaType }) => {
        if (hasQualityControl.some((e) => e === schemaType)) {
          return generateBadges(prev);
        }
        return prev;
      },
    },
  }),
);

export const publicationFlow = () =>
  publicationFlowConfig({
    hasQualityControl: ["komponent_artikkel", "ds_artikkel", "aksel_artikkel"],
    hasPublishedAt: [...allArticleDocuments],
  });
