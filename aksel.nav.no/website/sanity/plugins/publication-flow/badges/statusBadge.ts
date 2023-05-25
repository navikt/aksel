import { differenceInMonths } from "date-fns";
import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";

export const CreateStatusBadge = (documentId) => {
  const WrappedStatusBadge = (
    props: DocumentBadgeProps
  ): DocumentBadgeDescription | null => {
    const { published, draft } = props;
    const lastVerified = draft?.updateInfo?.["lastVerified"];

    if (!published && !!lastVerified) {
      return {
        label: "Avpublisert",
        title: "Siden er ikke publisert på interwebsen",
        color: "danger",
      };
    }

    if (!published) {
      return {
        label: "Utkast",
        title: "Siden er ikke publisert på interwebsen",
        color: "primary",
      };
    }
    const outDated =
      differenceInMonths(new Date(), new Date(lastVerified)) >= 6;

    return {
      label: outDated ? "Publisert og gammel" : "Publisert",
      title: outDated
        ? "Innholdet må godkjennes asap!"
        : "Siden er publisert på interwebsen",
      color: outDated ? "danger" : "success",
    };
  };
  return WrappedStatusBadge;
};
