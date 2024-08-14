import cl from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  CodeIcon,
  ExternalLinkIcon,
  LaptopIcon,
  MobileSmallIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Button, Chips, HStack } from "@navikt/ds-react";
import SnippetLazy from "@/cms/code-snippet/SnippetLazy";
import ErrorBoundary from "@/error-boundary";
import { CodeExamplesT } from "@/types";
import { TextWithMarkdownLink } from "@/web/TextWithMarkdownLink";
import { CodeSandbox } from "./parts/CodeSandbox";
import { Sandbox } from "./parts/Sandbox";

const iframePaddingNormal = 192;
const iframePaddingCompact = 60;

type CodeExamplesProps = {
  node: CodeExamplesT;
};

const ComponentExamples = ({ node }: CodeExamplesProps) => {
  const [activeExample, setActiveExample] = useState("");
  const [frameState, setFrameState] = useState(300);
  const [unloaded, setUnloaded] = useState(true);
  const [showCode, setShowCode] = useState(!node.compact);

  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    const iframePadding = node.compact
      ? iframePaddingCompact
      : iframePaddingNormal;
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframeDOM = iframeRef.current?.contentDocument;

      let exampleWrapper: HTMLElement | null = null;

      if (node.dir.variant === "templates") {
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

      if (exampleWrapper && exampleWrapper.offsetHeight) {
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

  useEffect(() => {
    node.dir?.filer?.[0]?.navn && setActiveExample(node.dir.filer[0].navn);
  }, [node]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1] || "";
    const prefix = `${node.dir.title.toLowerCase()}demo-`;
    const navn = hash.replace(prefix, "");
    if (
      hash.startsWith(prefix) &&
      node.dir.filer.some((f) => f.navn === navn)
    ) {
      setActiveExample(navn);
    }
  }, [router, node]);

  if (!node.dir?.filer || node.dir.filer.length === 0) {
    return null;
  }

  const active = activeExample || node.dir?.filer?.[0]?.navn;
  const demoVariant = node.dir?.variant;

  return (
    <div>
      {node.dir.filer.length > 1 && (
        <div className="mb-5 max-w-xl">
          <Chips>
            {node.dir.filer.map((fil) => (
              <Chips.Toggle
                checkmark={false}
                key={fil._key}
                value={fil.navn}
                selected={active === fil.navn}
                id={`${node.dir.title.toLowerCase()}demo-${fil.navn}`}
                onClick={async () => {
                  setUnloaded(true);
                  await router.replace(
                    `${
                      router.asPath.split("#")[0]
                    }#${node.dir.title.toLowerCase()}demo-${fil.navn}`,
                  );
                }}
              >
                {fil.title}
              </Chips.Toggle>
            ))}
          </Chips>
        </div>
      )}
      {node.dir.filer.map((fil) => (
        <div
          key={fil._key}
          className={cl({
            visible: active === fil.navn,
            hidden: active !== fil.navn,
          })}
        >
          {fil?.description && (
            <BodyLong className="mb-2">
              <TextWithMarkdownLink>{fil.description}</TextWithMarkdownLink>
            </BodyLong>
          )}

          {active === fil.navn && (
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
                <iframe
                  ref={iframeRef}
                  src={`/${demoVariant}/${node.dir.title}/${fil.navn}`}
                  height={frameState}
                  onLoad={handleExampleLoad}
                  aria-label={`${node.dir?.title} ${fil.title} eksempel`}
                  title="Demo"
                  className={cl(
                    "block w-full max-w-full resize-x bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]",
                    {
                      invisible: unloaded,
                    },
                  )}
                />
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
                          if (iframeRef.current) {
                            iframeRef.current.style.width = "360px";
                          }
                        }}
                      />

                      <Button
                        variant="tertiary-neutral"
                        size="small"
                        icon={
                          <LaptopIcon title="Sett eksempel til desktopbredde" />
                        }
                        onClick={() => {
                          if (iframeRef.current) {
                            iframeRef.current.style.width = "";
                          }
                        }}
                      />
                    </HStack>
                  </div>

                  <HStack gap="2">
                    <Button
                      variant="tertiary-neutral"
                      size="small"
                      icon={<CodeIcon aria-hidden />}
                      onClick={() => setShowCode(!showCode)}
                    >
                      {showCode ? "Skjul" : "Vis"} kode
                    </Button>
                    {fil.sandboxEnabled && <Sandbox code={fil.sandboxBase64} />}
                    <CodeSandbox code={fil.innhold.trim()} />
                    <Button
                      variant="tertiary-neutral"
                      size="small"
                      icon={
                        <ExternalLinkIcon title="Åpne eksempel i nytt vindu" />
                      }
                      target="_blank"
                      className="si-ignore"
                      as="a"
                      href={`/${demoVariant}/${
                        node.dir.title
                      }/${fil.navn.replace(".tsx", "")}`}
                    />
                  </HStack>
                </HStack>
              </div>

              {showCode && (
                <SnippetLazy
                  node={{
                    code: { code: fil.innhold.trim(), language: "tsx" },
                  }}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Component(props: CodeExamplesProps) {
  return (
    <ErrorBoundary boundaryName="Kodeeksempler">
      <ComponentExamples {...props} />
    </ErrorBoundary>
  );
}
