import Link from "next/link";
import { Detail, HStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { DS_PROMO_QUERY } from "@/app/_sanity/queries";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import styles from "./PromoTag.module.css";

async function PromoTag() {
  const { data: promoData } = await sanityFetch({
    query: DS_PROMO_QUERY,
  });

  if (!promoData?.show) {
    return null;
  }

  if (!promoData.label || !promoData.text || !promoData.link) {
    return null;
  }

  return (
    <Link
      className={styles.promoTag}
      href={promoData.link}
      data-color="aksel-brand-pink"
      data-animated-arrow-anchor
    >
      <Detail as="span" className={styles.promoTagContent} textColor="default">
        <Detail as="span" className={styles.promoTagLabel}>
          {promoData.label}
        </Detail>
        <HStack gap="space-4" align="center" as="span" wrap={false}>
          <span>{promoData.text}</span>
          <AnimatedArrowRight />
        </HStack>
      </Detail>
    </Link>
  );
}

export default PromoTag;
