import { differenceInMonths } from "date-fns";
import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";

export const CreateStatusBadge = (documentId) => {
  const WrappedStatusBadge = (
    props: DocumentBadgeProps
  ): DocumentBadgeDescription | null => {
    const { published } = props;
    const lastVerified = published?.updateInfo?.["lastVerified"];

    if (!published)
      return {
        label: "Avpublisert",
        title: "Siden er ikke publisert på interwebsen",
        color: "primary",
      };

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
