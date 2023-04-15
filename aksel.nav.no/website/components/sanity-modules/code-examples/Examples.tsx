import { capitalize, Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { CodeExapmplesT } from "@/types";
import { BodyLong, Chips, Link } from "@navikt/ds-react";
import cl from "clsx";
import { useEffect, useState } from "react";
import { CodeSandbox } from "./CodeSandbox";

const iframePadding = 192;
const iframeId = "example-iframe";

const ComponentExamples = ({ node }: { node: CodeExapmplesT }) => {
  const [activeExample, setActiveExample] = useState(null);
  const [frameState, setFrameState] = useState(300);
  const [unloaded, setUnloaded] = useState(true);

  const handleExampleLoad = () => {
    let attempts = 0;
    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        iframeId
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper = exampleIframeDOM?.getElementById("ds-example");
      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        clearInterval(waitForExampleContentToRender);
        setFrameState(newHeight < 300 ? 300 : newHeight);
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

  const fixName = (str: string) =>
    capitalize(
      str
        .replace(/[^\w]|_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    ) ?? str;

  if (!node.dir?.filer || node.dir.filer.length === 0) {
    return null;
  }

  const active = activeExample ?? node?.dir?.filer?.[0]?.navn;

  return (
    <div>
      <div className="mb-5 max-w-xl">
        <Chips>
          {node.dir.filer.map((fil) => {
            return (
              <Chips.Toggle
                key={fil._key}
                value={fil.navn}
                selected={active === fil.navn}
                onClick={() => {
                  setActiveExample(fil.navn);
                  setUnloaded(true);
                }}
              >
                {fixName(fil.navn)}
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
                    "overflow-hidden rounded-t border border-b-0 border-gray-300 ",
                    {
                      "relative animate-pulse": unloaded,
                      "bg-gray-50": !unloaded,
                    }
                  )}
                >
                  <iframe
                    src={`/eksempler/${node.dir.title}/${fil.navn.replace(
                      ".tsx",
                      ""
                    )}`}
                    height={frameState}
                    onLoad={() => handleExampleLoad()}
                    id={iframeId}
                    aria-label={`${node?.dir?.title} ${fil.navn} eksempel`}
                    className={cl(
                      "min-w-80 block w-full max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]",
                      { invisible: unloaded }
                    )}
                    title="Kode-eksempler"
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
                <div className="mb-2 flex justify-center gap-2 rounded-b border border-gray-300 px-2 py-1 text-base sm:justify-end ">
                  <CodeSandbox code={fil.innhold.trim()} />
                  <Link
                    href={`/eksempler/${node.dir.title}/${fil.navn.replace(
                      ".tsx",
                      ""
                    )}`}
                    className="si-ignore text-gray-900"
                    target="_blank"
                  >
                    Åpne i nytt vindu
                  </Link>
                </div>

                <Snippet
                  node={{
                    code: { code: fil.innhold.trim(), language: "jsx" },
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

export default withErrorBoundary(ComponentExamples, "Eksempler kode");
