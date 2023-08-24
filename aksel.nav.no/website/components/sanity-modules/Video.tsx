import { withErrorBoundary } from "@/error-boundary";
import { VideoT } from "@/types";
import { BodyLong, ReadMore } from "@navikt/ds-react";
import cl from "clsx";
import { useState } from "react";

const Video = ({ node }: { node: VideoT }) => {
  const [open, setOpen] = useState(false);

  if (!node || (!node.webm && !node.fallback) || !node.alt) {
    console.log("called");
    return null;
  }

  /* https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies#1:_Use_.40aria-label_for_the_text_description_of_player */
  return (
    <figure className={cl("m-0 mb-8 flex flex-col gap-2")}>
      <video
        className="focus-visible:shadow-focus-gap rounded-lg focus:outline-none"
        title={node.alt}
        playsInline
        controls
        loop
        aria-describedby={
          node.transkripsjon ? node.alt + "transkript" : undefined
        }
        aria-label="Trykk space for å starte/pause video"
      >
        <source src={node.webm.url} type={`video/${node.webm.extension}`} />
        {node.fallback && (
          <source
            src={node.fallback.url}
            type={`video/${node.fallback.extension}`}
          />
        )}
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
          <span id={node.alt + "transkript"}>{node.transkripsjon}</span>
        </ReadMore>
      )}
    </figure>
  );
};

export default withErrorBoundary(Video, "Video");
