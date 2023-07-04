import { withErrorBoundary } from "@/error-boundary";
import { BodyLong, ReadMore } from "@navikt/ds-react";
import cl from "clsx";
import { useState } from "react";

const Video = ({
  node,
}: {
  node: {
    _key?: string;
    bruk_embed?: boolean;
    embed?: string;
    alt: string;
    webm: { extension: string; url: string } | null;
    fallback: { extension: string; url: string } | null;
    transkripsjon?: string;
    caption?: string;
  };
}) => {
  const [open, setOpen] = useState(false);

  if (
    !node ||
    (!node.webm && !node.fallback && !node.bruk_embed && !node.embed) ||
    (!!node.bruk_embed && !node.embed) ||
    !node.alt
  ) {
    return null;
  }

  const getVideo = () => node.embed;

  /* https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies#1:_Use_.40aria-label_for_the_text_description_of_player */
  return (
    <figure className={cl("m-0 mb-8 flex flex-col gap-2")}>
      {node.bruk_embed ? (
        <>
          <div
            className="iframe-parent border-border-divider border"
            dangerouslySetInnerHTML={{ __html: getVideo() }}
          />
          <style jsx global>
            {`
              .iframe-parent iframe {
                aspect-ratio: 16/9;
                border: none;
                height: auto;
                width: auto;
                max-width: 100%;
                width: 100%;
              }
            `}
          </style>
        </>
      ) : (
        <video
          className="focus-visible:shadow-focus-gap focus:outline-none"
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
          <source
            src={node.fallback.url}
            type={`video/${node.fallback.extension}`}
          />
        </video>
      )}
      {node?.caption && (
        <BodyLong as="figcaption" className="self-center">
          {node.caption}
        </BodyLong>
      )}
      {node?.transkripsjon && (
        <ReadMore
          header={`${open ? "Lukk" : "Åpne"} video transkripsjon`}
          className="ml-[2px]"
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
