import { capitalize, Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { BodyLong, Link, Chips } from "@navikt/ds-react";
import cl from "classnames";
import { useEffect, useId, useState } from "react";
import { CodeSandbox } from "./CodeSandbox";

const iframePadding = 192;

const ComponentExamples = ({
  node,
}: {
  node: Omit<SanityT.Schema.kode_eksempler, "dir" | "filnavn"> & {
    dir?: SanityT.Schema.kode_eksempler_fil;
    filnavn?: SanityT.Schema.kode_eksempler_fil;
  };
}): JSX.Element => {
  const [iframeHeight, setIframeHeight] = useState(300);
  const [activeExample, setActiveExample] = useState(null);
  const iframeId = useId();

  const handleExampleLoad = (id: string) => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(id) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper = exampleIframeDOM?.getElementById("ds-example");

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        clearInterval(waitForExampleContentToRender);
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

  const element = (exampleUrl: string, code: string, id: string) => (
    <>
      <div className="overflow-hidden rounded-t border border-b-0 border-gray-300 bg-gray-50">
        <iframe
          src={exampleUrl}
          height={iframeHeight}
          onLoad={() => handleExampleLoad(id)}
          id={id}
          aria-label="Komponent eksempler"
          className="min-w-80 block w-full max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]"
          title="Kode-eksempler"
        />
      </div>
      <div className="xs:justify-end mb-2 flex justify-center gap-2 rounded-b border border-gray-300 px-2 py-1 text-base ">
        <CodeSandbox code={code.trim()} />
        <Link href={exampleUrl} className="text-gray-900" target="_blank">
          Åpne i nytt vindu
        </Link>
      </div>

      <Snippet
        node={{
          _type: "kode" as const,
          code: { code: code.trim(), language: "jsx" },
        }}
      />
    </>
  );

  if (
    !node.dir?.filer ||
    node.dir.filer.length === 0 ||
    (!node.standalone && !node.dir) ||
    (node.standalone && !node.filnavn)
  ) {
    return null;
  }

  if (node.standalone) {
    return element(
      `/eksempler/${node.filnavn.title.replace(".tsx", "")}`,
      node.filnavn?.filer?.[0]?.innhold ?? "",
      iframeId
    );
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
      {node.dir.filer.map((fil, xi) => {
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
            {element(
              `/eksempler/${node.dir.title}/${fil.navn.replace(".tsx", "")}`,
              fil.innhold,
              iframeId + xi
            )}
          </div>
        );
      })}
    </div>
  );
};

export default withErrorBoundary(ComponentExamples, "Eksempler kode");
