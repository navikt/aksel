import { useCallback, useEffect, useRef, useState } from "react";
import { SanityDocumentLike } from "sanity";
import {
  ArrowsCirclepathIcon,
  LeaveIcon,
  MobileSmallIcon,
} from "@navikt/aksel-icons";
import { Button, CopyButton, HStack, Loader, Spacer } from "@navikt/ds-react";

export type IframeProps = {
  document: {
    displayed: SanityDocumentLike;
  };
  options: { url: (document: SanityDocumentLike) => unknown };
};

const sizes = {
  desktop: {
    width: `100%`,
    height: `100%`,
    maxHeight: `100%`,
  },
  mobile: {
    width: 414,
    height: `100%`,
    maxHeight: 736,
  },
};

export const Iframe = (props: IframeProps) => {
  const { document: sanityDocument, options } = props;
  const { displayed } = sanityDocument;
  const { url } = options;
  const [displayUrl, setDisplayUrl] = useState("");
  const [iframeSize, setIframeSize] = useState("desktop");
  const iframe = useRef<HTMLIFrameElement>(null);
  const initialLoad = useRef(true);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    if (!iframe?.current) {
      return;
    }

    // Funky way to reload an iframe without CORS issuies
    // eslint-disable-next-line no-self-assign
    iframe.current.src = iframe.current.src;
    setLoading(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      !initialLoad.current && reload();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [displayed.slug, reload]);

  useEffect(() => {
    const getUrl = async () => {
      const resolveUrl = await url(displayed);

      // Only update state if URL has changed
      if (
        resolveUrl !== displayUrl &&
        resolveUrl &&
        typeof resolveUrl === "string"
      ) {
        initialLoad.current = false;
        setDisplayUrl(resolveUrl);
      }
    };

    getUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed._rev]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="place-self-stretch border-b border-b-border-subtle p-2">
        <HStack align="center" gap="2">
          <CopyButton copyText={displayUrl} size="small" text="Kopier url" />
          <Spacer />
          <HStack align="center" gap="2">
            <Button
              icon={<MobileSmallIcon title="Velg frame-størrelse" />}
              onClick={() =>
                setIframeSize(iframeSize === "mobile" ? "desktop" : "mobile")
              }
              size="small"
              variant="tertiary"
            />

            <Button
              icon={<ArrowsCirclepathIcon title="reload side" />}
              onClick={() => reload()}
              size="small"
              variant="tertiary"
            />
            <Button
              size="small"
              icon={<LeaveIcon aria-hidden />}
              onClick={() => window.open(displayUrl)}
              variant="tertiary"
              iconPosition="right"
            >
              Åpne side
            </Button>
          </HStack>
        </HStack>
      </div>
      <div className="h-full w-full">
        {loading && (
          <div className="absolute inset-0 grid h-full w-full place-content-center bg-surface-backdrop">
            <Loader size="2xlarge" variant="inverted" />
          </div>
        )}

        <iframe
          ref={iframe}
          title="preview"
          style={sizes[iframeSize]}
          src={displayUrl}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};
