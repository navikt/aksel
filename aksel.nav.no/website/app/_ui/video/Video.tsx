import { useId } from "react";
import { BodyLong, Box, ReadMore, VStack } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import styles from "./Video.module.css";

function Video(props: ExtractPortableComponentProps<"video">) {
  const { webm, fallback, alt, caption, transkripsjon, track } = props.value;

  const transcriptId = useId();

  if (((!webm || !webm.url) && (!fallback || !fallback.url)) || !alt) {
    return null;
  }

  /* https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies#1:_Use_.40aria-label_for_the_text_description_of_player */
  return (
    <VStack gap="space-8" data-block-margin="space-28">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className={styles.video}
        title={alt}
        playsInline
        controls
        loop
        aria-describedby={transkripsjon ? transcriptId : undefined}
        poster="/images/og/video-poster.png"
        crossOrigin="anonymous" // Needed for the <track>
      >
        {webm.url && (
          <source src={webm.url} type={`video/${webm?.extension}`} />
        )}
        {fallback.url && (
          <source src={fallback.url} type={`video/${fallback.extension}`} />
        )}
        {track && <track kind="captions" srcLang="no" src={track} />}
      </video>
      {caption && (
        <Box asChild paddingInline="space-16">
          <BodyLong as="figcaption">{caption}</BodyLong>
        </Box>
      )}
      {transkripsjon && (
        <Box asChild paddingInline="space-16">
          <ReadMore header="Transkripsjon">
            <div id={transcriptId}>
              {transkripsjon.split("\n\n").map((paragraph, i, array) => (
                <BodyLong key={i} spacing={i < array.length - 1}>
                  {paragraph}
                </BodyLong>
              ))}
            </div>
          </ReadMore>
        </Box>
      )}
    </VStack>
  );
}

export { Video };
