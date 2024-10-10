import { differenceInMonths } from "date-fns";
import {
  DocumentBadgeDescription,
  DocumentBadgeProps,
  SanityDocument,
} from "sanity";
import { Oppdateringsvarsel } from "../../../schema/documents/presets/oppdateringsvarsel";

export const CreateStatusBadge = () => {
  const WrappedStatusBadge = (
    props: DocumentBadgeProps,
  ): DocumentBadgeDescription | null => {
    const { published, draft } = props;
    const verifiedDocument = draft as
      | (SanityDocument & Oppdateringsvarsel)
      | null;

    const lastVerified = verifiedDocument?.updateInfo?.lastVerified;

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
      differenceInMonths(new Date(), new Date(lastVerified ?? new Date())) >= 6;

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
