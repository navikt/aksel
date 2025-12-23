/* eslint-disable @next/next/no-img-element */
import { HandKnotIcon, ThumbDownIcon, ThumbUpIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, HGrid } from "@navikt/ds-react";
import { AkselColor } from "@navikt/ds-react/types/theme";
import { Do_dont_block } from "@/app/_sanity/query-types";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { urlForImage } from "@/app/_sanity/utils";
import styles from "./DoDont.module.css";

function DoDont(props: ExtractPortableComponentProps<"do_dont">) {
  const { blokker } = props.value;

  if (!blokker || blokker?.length === 0) {
    return null;
  }

  return (
    <HGrid
      data-block-margin="space-28"
      columns="repeat(auto-fill, minmax(18rem, 1fr))"
      gap="space-24"
    >
      {blokker.map((block) => {
        const imageUrl = urlForImage(block.picture)?.auto("format").url();

        if (!imageUrl || !block.variant) {
          return null;
        }

        const { role } = NotchConfig[block.variant];

        return (
          <Box
            as="figure"
            key={block._key}
            gridColumn={block.fullwidth ? "span 2" : "span 1"}
            data-color={role}
            className={styles.doDont}
          >
            <Notch block={block} />
            {/** biome-ignore lint/performance/noImgElement: Img element is fine here */}
            <img
              className={`light ${styles.doDontImage}`}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              src={imageUrl}
            />
            <Description description={block.description} />
          </Box>
        );
      })}
    </HGrid>
  );
}

const NotchConfig: Record<
  NonNullable<Do_dont_block["variant"]>,
  { icon: typeof HandKnotIcon; text: string; role: AkselColor }
> = {
  do: {
    icon: ThumbUpIcon,
    text: "Gjør",
    role: "info",
  },
  dont: {
    icon: ThumbDownIcon,
    text: "Unngå",
    role: "danger",
  },
  warning: {
    icon: HandKnotIcon,
    text: "Pass på",
    role: "warning",
  },
};

function Notch({ block }: { block: Do_dont_block }) {
  if (!block.variant) {
    return null;
  }

  const { icon: Icon, text } = NotchConfig[block.variant];

  return (
    <div className={styles.doDontNotch}>
      <Icon aria-hidden fontSize="1.5rem" />
      <BodyShort as="span" size="large">
        {text}
      </BodyShort>
    </div>
  );
}

function Description({ description }: { description?: string }) {
  if (!description || description.length === 0) {
    return null;
  }

  return (
    <BodyShort as="figcaption" className={styles.doDontDescription}>
      {description}
    </BodyShort>
  );
}

export { DoDont };
