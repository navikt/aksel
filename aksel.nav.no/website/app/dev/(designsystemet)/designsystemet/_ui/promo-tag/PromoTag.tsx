import Link from "next/link";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Detail } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import "./promo-tag.css";

type PromoTag = NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_forside_promo_tag"];

type Props = {
  label: NonNullable<PromoTag>["label"];
  text: NonNullable<PromoTag>["text"];
  link: NonNullable<PromoTag>["link"];
};

const PromoTag = ({ label = "Nyhet", text, link }: Props) => {
  if (!text || !link) {
    return null;
  }
  return (
    <Link href={link} data-color="aksel-brand-pink">
      <Detail as="span" className="promoTag" textColor="default">
        <Detail as="span" className="promoTagLabel">
          {label}
        </Detail>
        {text}
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
