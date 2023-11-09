import SnippetLazy from "@/cms/code-snippet/SnippetLazy";
import ErrorBoundary from "@/error-boundary";
import { CodeExamplesT } from "@/types";
import { capitalize } from "@/utils";
import {
  ExternalLinkIcon,
  LaptopIcon,
  MobileSmallIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Button, Chips, HStack } from "@navikt/ds-react";
import cl from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CodeSandbox } from "./parts/CodeSandbox";

const iframePadding = 192;
const iframeId = "example-iframe";

type CodeExamplesProps = {
  node: CodeExamplesT;
};

const ComponentExamples = ({ node }: CodeExamplesProps) => {
  const [activeExample, setActiveExample] = useState(null);
  const [frameState, setFrameState] = useState(300);
  const [unloaded, setUnloaded] = useState(true);
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    let attempts = 0;
    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        iframeId
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;

      let exampleWrapper: HTMLElement;

      if (node.dir.variant === "templates") {
        exampleWrapper = exampleIframeDOM?.getElementById("__next");
      } else {
        exampleWrapper = exampleIframeDOM?.getElementById("ds-example");
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
    node?.dir?.filer?.[0]?.navn && setActiveExample(node.dir.filer[0].navn);
  }, [node]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (
      hash &&
      hash.startsWith(`${node.dir.title.toLowerCase()}demo-`) &&
      node.dir.filer.some(
        (f) =>
          f.navn === hash.replace(`${node.dir.title.toLowerCase()}demo-`, "")
      )
    ) {
      setActiveExample(
        hash.replace(`${node.dir.title.toLowerCase()}demo-`, "") as string
      );
    }
  }, [router, node]);

  const fixName = (str: string) =>
    capitalize(
      str
        .replace(/[^\wæøå]|_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    ) ?? str;

  if (!node.dir?.filer || node.dir.filer.length === 0) {
    return null;
  }

  const active = activeExample ?? node?.dir?.filer?.[0]?.navn;
  const demoVariant = node.dir?.variant;

  return (
    <div>
      <div className="mb-5 max-w-xl">
        <Chips>
          {node.dir.filer.map((fil) => {
            return (
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
                    }#${node.dir.title.toLowerCase()}demo-${fil.navn}`
                  );
                }}
              >
                {fixName(fil.title)}
              </Chips.Toggle>
            );
          })}
        </Chips>
      </div>
      {node.dir.filer.map((fil) => {
        return (
          <div
            key={fil._key}
            className={cl({
              visible: active === fil.navn,
              hidden: active !== fil.navn,
            })}
          >
            {fil?.description && (
              <BodyLong className="mb-2">{fil.description}</BodyLong>
            )}

            {active === fil.navn && (
              <>
                <div
                  className={cl(
                    "overflow-hidden rounded-t-lg border border-b-0 border-gray-300 ",
                    {
                      "relative animate-pulse": unloaded,
                      "bg-gray-50": !unloaded,
                    }
                  )}
                >
                  <iframe
                    src={`/${demoVariant}/${node.dir.title}/${fil.navn.replace(
                      ".tsx",
                      ""
                    )}`}
                    height={frameState}
                    onLoad={() => handleExampleLoad()}
                    id={iframeId}
                    aria-label={`${node?.dir?.title} ${fil.navn} eksempel`}
                    className={cl(
                      "min-w-80 block w-full max-w-full resize-x bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]",
                      {
                        invisible: unloaded,
                      }
                    )}
                    title="Kode-eksempler"
                    ref={iframeRef}
                  />
                  {unloaded && (
                    <div className="absolute inset-0 mx-auto flex flex-col items-center justify-center gap-2">
                      <div className="grid w-3/5 gap-2">
                        <div className="bg-surface-neutral-subtle h-6 w-2/3 rounded-xl" />
                        <div className="bg-surface-neutral-subtle h-16 w-full rounded-xl" />
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
                          onClick={() =>
                            (iframeRef.current.style.width = "360px")
                          }
                        />

                        <Button
                          variant="tertiary-neutral"
                          size="small"
                          icon={
                            <LaptopIcon title="Sett eksempel til desktopbredde" />
                          }
                          onClick={() => (iframeRef.current.style.width = "")}
                        />
                      </HStack>
                    </div>

                    <HStack gap="2">
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

                <SnippetLazy
                  node={{
                    code: { code: fil.innhold.trim(), language: "tsx" },
                  }}
                />
              </>
            )}
          </div>
        );
      })}
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
