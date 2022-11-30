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
  createWrappedPublishAction,
  createWrappedRestoreAction,
  createWrappedUnpublishAction,
} from "./actions";
import { createBadgeComponent, CreateStatusBadge } from "./badges";

const includedSchemas: string[] = ["testDoc"];

const generateBadges = (prev: DocumentBadgeComponent[], documentId: string) => {
  const defaultBadges = prev.map((badge: DocumentBadgeComponent) => {
    return createBadgeComponent(badge);
  });
  return [...defaultBadges, CreateStatusBadge(documentId)];
};

const getCustomActions = (prev: DocumentActionComponent[]) => {
  const defaultActions = prev.map((action) => {
    if (action.action === "publish") {
      return createWrappedPublishAction(action);
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
  const customActions = [createWrappedApproveAction()];
  return [...defaultActions, ...customActions];
};

export const publicationFlow = definePlugin({
  name: "publication-flow",
  document: {
    actions: (prev, { schemaType }) => {
      if (includedSchemas.some((e) => e === schemaType)) {
        return getCustomActions(prev);
      }
      return prev;
    },
    badges: (prev, { documentId }) => {
      return generateBadges(prev, documentId);
    },
  },
});
