import Link from "next/link";
import { Detail, HStack } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import styles from "./PromoTag.module.css";

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
    <Link href={link} data-color="aksel-brand-pink" data-animated-arrow-anchor>
      <Detail as="span" className={styles.promoTag} textColor="default">
        <Detail as="span" className={styles.promoTagLabel}>
          {label}
        </Detail>
        <HStack gap="space-4" align="center" as="span" wrap={false}>
          <span>{text}</span>
          <AnimatedArrowRight />
        </HStack>
      </Detail>
    </Link>
  );
};

export default PromoTag;
