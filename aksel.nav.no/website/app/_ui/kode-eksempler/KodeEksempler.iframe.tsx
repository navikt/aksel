"use client";

import { stegaClean } from "next-sanity";
import { useState } from "react";
import { BoxNew, HStack, Skeleton, VStack } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import styles from "./KodeEksempler.module.css";
import { useKodeEksempler } from "./KodeEksempler.provider";
import { KodeEksemplerToolbar } from "./KodeEksempler.toolbar";

const iframePaddingNormal = 192;
const iframePaddingCompact = 60;

function KodeEksemplerIFrame(props: {
  dir: NonNullable<
    ExtractPortableComponentProps<"kode_eksempler">["value"]["dir"]
  >;
}) {
  const { dir } = props;

  const [frameState, setFrameState] = useState(300);

  const {
    activeExample: { current, loaded, updateLoaded },
    showCode,
    compact,
    resizerRef,
    iframeRef,
  } = useKodeEksempler();

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
        updateLoaded(true);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  const demoVariant = dir.variant;
  const iframeUrl = stegaClean(`/${demoVariant}/${dir.title}/${current?.navn}`);

  const hasJSXSnippet = !!current?.kompaktInnhold;

  return (
    <div>
      <div className={styles.kodeExampleContainer}>
        <div
          ref={resizerRef} // Resize directly on iframe doesn't work in Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=680823)
          className={styles.kodeExampleRezizer}
        >
          <iframe
            key={iframeUrl}
            src={iframeUrl}
            ref={iframeRef}
            height={frameState}
            /* @note: onLoad does no trigger for initial render in dev-mode */
            onLoad={handleExampleLoad}
            aria-label={`${dir?.title} ${current?.title} eksempel`}
            title="Demo"
            className={styles.kodeExampleIframe}
            style={{
              // Prevent the iframe from covering up the resize handle in Safari
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
            }}
          />
        </div>

        {/* Skeleton loading */}
        {!loaded && (
          <HStack asChild justify="center" align="center">
            <BoxNew inset="0" position="absolute" background="default">
              <VStack gap="space-8" width="70%">
                <Skeleton variant="rounded" width="66%" height="1.5rem" />
                <Skeleton variant="rounded" width="100%" height="4rem" />
              </VStack>
            </BoxNew>
          </HStack>
        )}
      </div>

      <KodeEksemplerToolbar
        code={current?.innhold?.trim()}
        base64={current?.sandboxEnabled ? current?.sandboxBase64 : undefined}
        link={iframeUrl}
        reload={() => {
          updateLoaded(false);
          iframeRef.current?.contentWindow?.location.reload();
        }}
      />

      {showCode && (
        <CodeBlock
          data-block-margin="space-0"
          aria-label={`Kode for ${current?.title}`}
          tabs={[
            {
              text: "TSX",
              value: "example",
              lang: "tsx",
              code:
                (hasJSXSnippet ? current?.kompaktInnhold : current?.innhold) ??
                "",
              extraCode: hasJSXSnippet ? current?.innhold : undefined,
            },
          ]}
        />
      )}
    </div>
  );
}

export { KodeEksemplerIFrame };
