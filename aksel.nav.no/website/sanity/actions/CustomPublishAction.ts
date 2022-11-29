import { differenceInMonths, format } from "date-fns";
import {
  definePlugin,
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  DocumentBadgeComponent,
  DocumentBadgeDescription,
  DocumentBadgeProps,
  useDocumentOperation,
} from "sanity";

const includedSchemas: string[] = ["testDoc"];

const createWrappedPublishAction = (publishAction: DocumentActionComponent) => {
  const WrappedPublish = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalPublishDescription = publishAction(props);
    const { patch, publish } = useDocumentOperation(props.id, props.type);

    return (
      originalPublishDescription && {
        ...originalPublishDescription,
        label: "Publish 2.0",
        onHandle: () => {
          !props.published &&
            patch.execute(
              [
                {
                  set: {
                    updateInfo: {
                      lastVerified: format(new Date(), "yyyy-MM-dd"),
                    },
                  },
                },
              ],
              props
            );
          publish.execute();
          props.onComplete();
        },
      }
    );
  };

  return WrappedPublish;
};

const createBadgeComponent = (badgeAction: DocumentBadgeComponent) => {
  const WrappedBadge = (
    props: DocumentBadgeProps
  ): DocumentBadgeDescription | null => {
    const originalBadgeDescription = badgeAction(props);

    return (
      originalBadgeDescription && {
        ...originalBadgeDescription,
      }
    );
  };

  return WrappedBadge;
};

const CreateStatusBadge = (documentId) => {
  const WrappedStatusBadge = (
    props: DocumentBadgeProps
  ): DocumentBadgeDescription | null => {
    const { published } = props;
    const lastVerified = published?.updateInfo?.["lastVerified"];

    if (!published || !lastVerified) return;

    const outDated =
      differenceInMonths(new Date(), new Date(lastVerified)) >= 6
        ? true
        : false;
    console.log(outDated);

    return {
      label: outDated ? "Utdatert" : "Oppdatert",
      title: outDated
        ? "Denne artikkelen har ikke blitt oppdatert/verifisert på over 6 mnd."
        : "Denne artikkelen er oppdatert",
      color: outDated ? "warning" : "success",
    };
  };
  return WrappedStatusBadge;
};

const generateBadges = (prev: DocumentBadgeComponent[], documentId: string) => {
  const defaultBadges = prev.map((badge) => {
    return createBadgeComponent(badge);
  });
  return [...defaultBadges, CreateStatusBadge(documentId)];
};

export const customPublish = definePlugin({
  name: "custom-publish-action",
  document: {
    actions: (prev, { schemaType }) => {
      return prev.map((action) => {
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "publish"
        ) {
          return createWrappedPublishAction(action);
        }
        return action;
      });
    },
    badges: (prev, { documentId }) => {
      return generateBadges(prev, documentId);
    },
  },
});
