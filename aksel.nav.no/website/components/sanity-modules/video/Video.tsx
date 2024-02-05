import { useId, useState } from "react";
import { BodyLong, ReadMore } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { VideoT } from "@/types";

type VideoProps = {
  node: VideoT;
};

const Video = ({ node }: VideoProps) => {
  const [open, setOpen] = useState(false);
  const transcriptId = useId();

  if (!node || (!node.webm && !node.fallback) || !node.alt) {
    return null;
  }

  /* https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies#1:_Use_.40aria-label_for_the_text_description_of_player */
  return (
    <figure className="mb-7 grid gap-2">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="w-full rounded-lg focus:outline-none focus-visible:shadow-focus-gap"
        title={node.alt}
        playsInline
        controls
        loop
        aria-describedby={node.transkripsjon ? transcriptId : undefined}
        poster="/images/og/video-poster.png"
        crossOrigin={
          globalThis?.location?.port === "3000" ? "anonymous" : undefined
        } // Needed for the <track>
      >
        <source src={node.webm.url} type={`video/${node.webm.extension}`} />
        {node.fallback && (
          <source
            src={node.fallback.url}
            type={`video/${node.fallback.extension}`}
          />
        )}
        {node.track && <track kind="captions" srcLang="no" src={node.track} />}
      </video>
      {node?.caption && (
        <BodyLong as="figcaption" className="px-7">
          {node.caption}
        </BodyLong>
      )}
      {node?.transkripsjon && (
        <ReadMore
          header="Transkripsjon"
          open={open}
          onClick={() => setOpen((x) => !x)}
        >
          <div id={transcriptId} className="whitespace-break-spaces">
            {node.transkripsjon.split("\n\n").map((paragraph, i, array) => (
              <BodyLong key={i} spacing={i < array.length - 1}>
                {paragraph}
              </BodyLong>
            ))}
          </div>
        </ReadMore>
      )}
    </figure>
  );
};

export default function Component(props: VideoProps) {
  return (
    <ErrorBoundary boundaryName="Video">
      <Video {...props} />
    </ErrorBoundary>
  );
}
