/* eslint-disable @next/next/no-img-element */
import { BodyShort } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { urlForImage } from "@/app/_sanity/utils";
import { CompareImagesContainer } from "./CompareImages.container";
import { CompareImagesHandle } from "./CompareImages.handle";
import styles from "./CompareImages.module.css";
import { CompareImagesProvider } from "./CompareImages.provider";

function CompareImages(props: ExtractPortableComponentProps<"compare_images">) {
  const { image_1, image_2, caption, border, background } = props.value;

  if (!image_1 || !image_2) {
    return null;
  }

  const imageOneUrl = urlForImage(image_1)?.auto("format").url();
  const imageTwoUrl = urlForImage(image_2)?.auto("format").url();

  if (!imageOneUrl || !imageTwoUrl) {
    return null;
  }

  return (
    <CompareImagesProvider background={background}>
      <figure
        data-block-margin="space-28"
        data-border={border}
        className={styles.compareImagesFigure}
      >
        <CompareImagesContainer>
          <CompareImagesHandle />
          <div
            className={styles.compareImagesImgContainer}
            data-position="left"
          >
            <img
              src={imageOneUrl}
              alt={image_1.alt}
              className={styles.compareImagesImg}
            />
          </div>
          <div
            className={styles.compareImagesImgContainer}
            data-position="right"
          >
            <img
              src={imageTwoUrl}
              alt={image_2.alt}
              className={styles.compareImagesImg}
            />
          </div>
        </CompareImagesContainer>
        {caption && (
          <figcaption className={styles.compareImagesCaption}>
            <BodyShort as="span" size="small">
              {caption}
            </BodyShort>
          </figcaption>
        )}
      </figure>
    </CompareImagesProvider>
  );
}

export { CompareImages };
