import NextLink from "next/link";
import { Link as NavLink } from "@navikt/ds-react";
import { ArrowLeftIcon } from "@navikt/aksel-icons";

const Example = ({ backUrl, t }) => {
  return (
    <NextLink href={backUrl} passHref legacyBehavior>
      <NavLink className="back-link">
        <ArrowLeftIcon className="back-link-icon" aria-hidden={true} />
        {t("button.previous")}
      </NavLink>
    </NextLink>
  );
};
