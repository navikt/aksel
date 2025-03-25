"use client";

import cl from "clsx";
import { useRef, useState } from "react";
import {
  ExternalLinkIcon,
  LaptopIcon,
  MobileSmallIcon,
} from "@navikt/aksel-icons";
import { Button, HStack } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import { useKodeEksempler } from "./KodeEksempler.provider";

const iframePaddingNormal = 192;
const iframePaddingCompact = 60;

function KodeEksemplerIFrame(props: {
  dir: NonNullable<
    ExtractPortableComponentProps<"kode_eksempler">["value"]["dir"]
  >;
  compact?: boolean;
}) {
  const { dir, compact = false } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const [unloaded, setUnloaded] = useState(true);
  const [frameState, setFrameState] = useState(300);

  const { current } = useKodeEksempler().activeExample;

  const handleExampleLoad = () => {
    const iframePadding = compact ? iframePaddingCompact : iframePaddingNormal;
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframeDOM = iframeRef.current?.contentDocument;

      let exampleWrapper: HTMLElement | null = null;

      if (dir.variant === "templates") {
        const element = exampleIframeDOM?.getElementById("__next");
        if (element) {
          exampleWrapper = element;
        }
      } else {
        const element = exampleIframeDOM?.getElementById("ds-example");
        if (element) {
          exampleWrapper = element;
        }
      }

      if (exampleWrapper?.offsetHeight) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        clearInterval(waitForExampleContentToRender);
        setFrameState(Math.min(Math.max(newHeight, 300), 900));
        setUnloaded(false);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  const demoVariant = dir.variant;

  return (
    <div>
      <>
        <div
          className={cl(
            "overflow-hidden rounded-t-lg border border-b-0 border-gray-300",
            {
              "relative animate-pulse": unloaded,
              "bg-gray-50": !unloaded,
            },
          )}
        >
          <div
            ref={resizerRef} // Resize directly on iframe doesn't work in Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=680823)
            className={cl(
              "max-w-4xl resize-x overflow-hidden shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]",
              { invisible: unloaded },
            )}
          >
            <iframe
              ref={iframeRef}
              src={`/${demoVariant}/${dir.title}/${current?.navn}`}
              height={frameState}
              onLoad={handleExampleLoad}
              aria-label={`${dir?.title} ${current?.title} eksempel`}
              title="Demo"
              className="block max-h-[calc(100vh-200px)] w-full bg-white"
              style={{
                // Prevent the iframe from covering up the resize handle in Safari
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
              }}
            />
          </div>
          {unloaded && (
            <div className="absolute inset-0 mx-auto flex flex-col items-center justify-center gap-2">
              <div className="grid w-3/5 gap-2">
                <div className="h-6 w-2/3 rounded-xl bg-surface-neutral-subtle" />
                <div className="h-16 w-full rounded-xl bg-surface-neutral-subtle" />
              </div>
            </div>
          )}
        </div>
        <div className="mb-2 rounded-b-lg border border-gray-300 p-1">
          <HStack gap="4" justify="space-between">
            <div className="hidden sm:block">
              <HStack gap="2">
                <Button
                  variant="tertiary-neutral"
                  size="small"
                  icon={
                    <MobileSmallIcon title="Sett eksempel til mobilbredde" />
                  }
                  onClick={() => {
                    if (resizerRef.current) {
                      resizerRef.current.style.width = "360px";
                    }
                  }}
                />

                <Button
                  variant="tertiary-neutral"
                  size="small"
                  icon={<LaptopIcon title="Sett eksempel til desktopbredde" />}
                  onClick={() => {
                    if (resizerRef.current) {
                      resizerRef.current.style.width = "";
                    }
                  }}
                />
              </HStack>
            </div>

            <HStack gap="2">
              {/* <Button
                      variant="tertiary-neutral"
                      size="small"
                      icon={<CodeIcon aria-hidden />}
                      onClick={() => setShowCode(!showCode)}
                    >
                      {showCode ? "Skjul" : "Vis"} kode
                    </Button> */}
              {/* {fil.sandboxEnabled && <Sandbox code={fil.sandboxBase64} />} */}
              {/* <CodeSandbox code={fil.innhold.trim()} /> */}
              <Button
                variant="tertiary-neutral"
                size="small"
                icon={<ExternalLinkIcon title="Åpne eksempel i nytt vindu" />}
                target="_blank"
                className="si-ignore"
                as="a"
                href={`/${demoVariant}/${dir.title}/${current?.navn?.replace(
                  ".tsx",
                  "",
                )}`}
              />
            </HStack>
          </HStack>
        </div>

        <CodeBlock
          tabs={[
            {
              text: "TSX",
              value: "example",
              lang: "tsx",
              code: current?.innhold ?? "",
            },
          ]}
        />
      </>
    </div>
  );
}

export { KodeEksemplerIFrame };
