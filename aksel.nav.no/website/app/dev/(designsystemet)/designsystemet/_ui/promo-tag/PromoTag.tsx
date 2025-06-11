import Link from "next/link";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Detail } from "@navikt/ds-react";
import "./promo-tag.css";

const PromoTag = () => {
  return (
    <Link href="#">
      <Detail as="span" className="promoTag">
        <Detail as="span" textColor="contrast" className="promoTagLabel">
          Nyhet
        </Detail>
        Ny versjon av Aksel er ute (darkside) 🎉
        <ArrowRightIcon
          fontSize="16"
          aria-hidden="true"
          className="promoTagArrow"
        />
      </Detail>
    </Link>
  );
};

export default PromoTag;
