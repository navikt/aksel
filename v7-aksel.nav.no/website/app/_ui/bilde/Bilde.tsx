/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { BodyLong, HGrid, Link } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { urlForImage } from "@/app/_sanity/utils";
import styles from "./Bilde.module.css";

function Bilde(props: ExtractPortableComponentProps<"bilde">) {
  const {
    alt,
    dekorativt,
    small = true,
    border = true,
    background,
    caption,
    kilde,
  } = props.value;

  const imageUrl = urlForImage(props?.value)?.auto("format").url();

  if (!imageUrl) {
    return null;
  }
  const imageBg =
    background &&
    `rgba(${background.rgb?.r},${background.rgb?.g},${background.rgb?.b},${background.rgb?.a})`;

  return (
    <figure data-block-margin="space-28" className={styles.bildeFigure}>
      <img
        data-image-border={border}
        className={`light ${styles.bildeImage}`}
        style={{ "--bilde-background": imageBg }}
        alt={dekorativt ? "" : alt}
        decoding="async"
        src={imageUrl}
        data-image-size={small ? "small" : undefined}
      />
      {caption && (
        <HGrid
          as="figcaption"
          marginBlock="space-8 0"
          marginInline="space-12"
          gap="space-4"
          className={styles.bildeCaption}
        >
          <BodyLong as="span" size="small">
            {caption}
          </BodyLong>
          {kilde?.har_kilde && (
            <BodyLong as="span" size="small">
              {kilde?.link ? (
                <>
                  {`${kilde?.prefix}: `}

                  <Link as={NextLink} href={kilde.link}>
                    {kilde?.tekst}
                  </Link>
                </>
              ) : (
                <>{`${kilde?.prefix}: ${kilde?.tekst}`}</>
              )}
            </BodyLong>
          )}
        </HGrid>
      )}
    </figure>
  );
}

export { Bilde };
