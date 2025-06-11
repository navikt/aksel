import Link from "next/link";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Detail } from "@navikt/ds-react";
import "./promo-tag.css";

const PromoTag = () => {
  return (
    <Link href="#" data-color="aksel-brand-pink">
      <Detail as="span" className="promoTag" textColor="default">
        <Detail as="span" textColor="contrast" className="promoTagLabel">
          Nyhet
        </Detail>
        Ny versjon av Aksel er ute (darkside) 🎉
        <ChevronRightIcon
          fontSize="16px"
          aria-hidden="true"
          className="promoTagArrow"
        />
      </Detail>
    </Link>
  );
};

export default PromoTag;
