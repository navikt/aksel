import {
  definePlugin,
  DocumentActionComponent,
  DocumentBadgeComponent,
} from "sanity";
import {
  createWrappedApproveAction,
  createWrappedDeleteAction,
  createWrappedDiscardChangesAction,
  createWrappedDuplicateAction,
  createWrappedFocusAction,
  createWrappedRestoreAction,
  createWrappedUnpublishAction,
  createWrappedUpdateAction,
  createWrappedDefaultPublish,
} from "./actions";
import { createBadgeComponent, CreateStatusBadge } from "./badges";

const generateBadges = (prev: DocumentBadgeComponent[], documentId: string) => {
  const defaultBadges = prev.map((badge: DocumentBadgeComponent) => {
    return createBadgeComponent(badge);
  });
  return [...defaultBadges, CreateStatusBadge(documentId)];
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

export const publicationFlow = definePlugin<PublicationFlowOptions>(
  ({ hasQualityControl, hasPublishedAt }) => ({
    name: "publication-flow",
    document: {
      actions: (prev, { schemaType }) => {
        if (hasQualityControl.some((e) => e === schemaType)) {
          return getCustomActions(prev);
        } else if (hasPublishedAt.some((e) => e === schemaType)) {
          return withCustomPublishAction(prev);
        }
        return prev;
      },
      badges: (prev, { documentId, schemaType }) => {
        if (hasQualityControl.some((e) => e === schemaType)) {
          return generateBadges(prev, documentId);
        }
        return prev;
      },
    },
  })
);
