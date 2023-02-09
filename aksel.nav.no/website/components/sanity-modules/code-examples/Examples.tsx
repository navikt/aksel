import { capitalize, Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { BodyLong, Link, Chips } from "@navikt/ds-react";
import cl from "clsx";
import { useEffect, useState } from "react";
import { CodeSandbox } from "./CodeSandbox";

const iframePadding = 192;
const iframeId = "example-iframe";

const ComponentExamples = ({
  node,
}: {
  node: Omit<SanityT.Schema.kode_eksempler, "dir" | "filnavn"> & {
    dir?: SanityT.Schema.kode_eksempler_fil;
    filnavn?: SanityT.Schema.kode_eksempler_fil;
  };
}): JSX.Element => {
  const [activeExample, setActiveExample] = useState(null);
  const [frameState, setFrameState] = useState(300);

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

  if (
    !node.dir?.filer ||
    node.dir.filer.length === 0 ||
    (!node.standalone && !node.dir) ||
    (node.standalone && !node.filnavn)
  ) {
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
                onClick={() => setActiveExample(fil.navn)}
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
                <div className="overflow-hidden rounded-t border border-b-0 border-gray-300 bg-gray-50">
                  <iframe
                    src={`/eksempler/${node.dir.title}/${fil.navn.replace(
                      ".tsx",
                      ""
                    )}`}
                    height={frameState}
                    onLoad={() => handleExampleLoad()}
                    id={iframeId}
                    aria-label="Komponent eksempler"
                    className={cl(
                      "min-w-80 block w-full max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]"
                    )}
                    title="Kode-eksempler"
                  />
                </div>
                <div className="xs:justify-end mb-2 flex justify-center gap-2 rounded-b border border-gray-300 px-2 py-1 text-base ">
                  <CodeSandbox code={fil.innhold.trim()} />
                  <Link
                    href={`/eksempler/${node.dir.title}/${fil.navn.replace(
                      ".tsx",
                      ""
                    )}`}
                    className="text-gray-900"
                    target="_blank"
                  >
                    Åpne i nytt vindu
                  </Link>
                </div>

                <Snippet
                  node={{
                    _type: "kode" as const,
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
