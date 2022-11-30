import { definePlugin, DocumentBadgeComponent } from "sanity";
import {
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

export const publicationFlow = definePlugin({
  name: "publication-flow",
  document: {
    actions: (prev, { schemaType }) => {
      return prev.map((action) => {
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "publish"
        ) {
          return createWrappedPublishAction(action);
        }
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "unpublish"
        ) {
          return createWrappedUnpublishAction(action);
        }
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "delete"
        ) {
          return createWrappedDeleteAction(action);
        }
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "duplicate"
        ) {
          return createWrappedDuplicateAction(action);
        }
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "restore"
        ) {
          return createWrappedRestoreAction(action);
        }
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "discardChanges"
        ) {
          return createWrappedDiscardChangesAction(action);
        }
        return action;
      });
    },
    badges: (prev, { documentId }) => {
      return generateBadges(prev, documentId);
    },
  },
});
