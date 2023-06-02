import { SanityDocumentLike } from "sanity";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, Flex, Spinner, Text, ThemeProvider } from "@sanity/ui";
import {
  ArrowsCirclepathIcon,
  LeaveIcon,
  MobileSmallIcon,
} from "@navikt/aksel-icons";
import { CopyButton, Button } from "@navikt/ds-react";

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
    setTimeout(() => {
      reload();
    }, 0);
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
        setDisplayUrl(resolveUrl);
      }
    };

    getUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed?.slug, reload]);

  return (
    <ThemeProvider>
      <Flex direction="column" style={{ height: `100%` }}>
        <Card padding={2} borderBottom>
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <Flex align="center" gap={1}>
                <CopyButton copyText={displayUrl} size="small" />
                <Text size={1} textOverflow="ellipsis">
                  {displayUrl}
                </Text>
              </Flex>
            </Box>
            <Flex align="center" gap={1}>
              <Button
                icon={<MobileSmallIcon title="Velg frame-størrelse" />}
                onClick={() =>
                  setIframeSize(iframeSize === "mobile" ? "desktop" : "mobile")
                }
                size="small"
                variant="tertiary-neutral"
              />

              <Button
                icon={<ArrowsCirclepathIcon title="reload side" />}
                onClick={() => reload()}
                size="small"
                variant="tertiary-neutral"
              />
              <Button
                size="small"
                icon={<LeaveIcon aria-hidden />}
                onClick={() => window.open(displayUrl)}
                variant="tertiary-neutral"
                iconPosition="right"
              >
                Åpne side
              </Button>
            </Flex>
          </Flex>
        </Card>
        <Card
          tone="transparent"
          padding={iframeSize === "mobile" ? 2 : 0}
          style={{ height: `100%` }}
        >
          <Flex
            align="center"
            justify="center"
            style={{ height: `100%`, position: `relative` }}
          >
            {loading && (
              <Flex
                justify="center"
                align="center"
                style={{ inset: `0`, position: `absolute` }}
              >
                <Flex
                  style={{
                    ...sizes[iframeSize],
                    backgroundColor: `rgba(0,0,0,0.2)`,
                  }}
                  justify="center"
                  align="center"
                >
                  <Card padding={4} radius={2} shadow={1}>
                    <Flex
                      align="center"
                      direction="column"
                      gap={3}
                      height="fill"
                      justify="center"
                    >
                      <Spinner />
                    </Flex>
                  </Card>
                </Flex>
              </Flex>
            )}
            <iframe
              ref={iframe}
              title="preview"
              style={sizes[iframeSize]}
              frameBorder="0"
              src={displayUrl}
              onLoad={() => setLoading(false)}
            />
          </Flex>
        </Card>
      </Flex>
    </ThemeProvider>
  );
};
