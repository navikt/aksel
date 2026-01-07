import { Detail, HStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { DS_PROMO_QUERY } from "@/app/_sanity/queries";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import styles from "./PromoTag.module.css";

type PromoTagProps = {
  animated?: boolean;
};

async function PromoTag({ animated = false }: PromoTagProps) {
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
    <NextLink
      className={styles.promoTag}
      href={promoData.link}
      data-color="aksel-brand-pink"
      data-animated-arrow-anchor
      data-animated={animated}
    >
      <Detail as="span" className={styles.promoTagContent} textColor="default">
        <Detail as="span" className={styles.promoTagLabel}>
          {promoData.label}
        </Detail>
        <HStack gap="space-4" align="center" as="span" wrap={false}>
          <span className={styles.promoTagText}>{promoData.text}</span>
          <AnimatedArrowRight />
        </HStack>
      </Detail>
    </NextLink>
  );
}

export default PromoTag;
