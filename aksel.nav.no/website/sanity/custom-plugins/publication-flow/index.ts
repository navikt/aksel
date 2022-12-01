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
  const customActions = [createWrappedApproveAction()];
  return [...defaultActions, ...customActions];
};

interface PublicationFlowOptions {
  includedSchemas: string[];
}

export const publicationFlow = definePlugin<PublicationFlowOptions>(
  ({ includedSchemas }) => ({
    name: "publication-flow",
    document: {
      actions: (prev, { schemaType }) => {
        if (includedSchemas.some((e) => e === schemaType)) {
          return getCustomActions(prev);
        }
        return prev;
      },
      badges: (prev, { documentId, schemaType }) => {
        if (includedSchemas.some((e) => e === schemaType)) {
          return generateBadges(prev, documentId);
        }
        return prev;
      },
    },
  })
);
