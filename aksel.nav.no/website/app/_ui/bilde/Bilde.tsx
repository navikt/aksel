/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import type { Image } from "sanity";
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

  const imageUrl = urlForImage(props?.value as Image)
    ?.auto("format")
    .url();

  if (!imageUrl) {
    return null;
  }
  const imageBg =
    background &&
    `rgba(${background.rgb?.r},${background.rgb?.g},${background.rgb?.b},${background.rgb?.a})`;

  return (
    <figure
      data-block-margin="space-28"
      className={styles.bildeFigure}
      style={{ "--bilde-background": imageBg }}
      data-image-border={border}
    >
      <img
        className={`light ${styles.bildeImage}`}
        alt={dekorativt ? "" : alt}
        decoding="async"
        src={imageUrl}
        data-image-size={small ? "small" : undefined}
      />
      {caption && (
        <HGrid
          as="figcaption"
          marginBlock="space-8 0"
          gap="space-4"
          paddingBlock="space-16"
        >
          <BodyLong as="span" size="small">
            {caption}
          </BodyLong>
          {kilde?.har_kilde && (
            <BodyLong as="span" size="small">
              {kilde?.link ? (
                <>
                  {`${kilde?.prefix}: `}
                  <NextLink href={kilde.link} passHref legacyBehavior>
                    <Link className="break-normal">{kilde?.tekst}</Link>
                  </NextLink>
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
