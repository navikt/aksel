import { capitalize, Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SuccessStroke } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import * as Tabs from "@radix-ui/react-tabs";
import cl from "classnames";
import { useEffect, useState } from "react";
import { CodeSandbox } from "./CodeSandbox";

const exampleIframeId = "example-iframe";
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

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        node?.title ?? exampleIframeId
      ) as HTMLIFrameElement;
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
        .match(/\D/g)
        .join("")
        .trim()
    ) ?? str;

  const element = (exampleUrl: string, code: string) => (
    <>
      <div className="overflow-hidden rounded-t border border-b-0 border-gray-300 bg-gray-50">
        <iframe
          src={exampleUrl}
          height={iframeHeight}
          onLoad={handleExampleLoad}
          id={node?.title ?? exampleIframeId}
          aria-label="Komponent eksempler"
          className="block w-full min-w-80 max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]"
          title="Kode-eksempler"
        />
      </div>
      <div className="mb-2 flex justify-center gap-2 rounded-b border border-gray-300 px-2 py-1 text-base xs:justify-end ">
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
      node.filnavn?.filer?.[0]?.innhold ?? ""
    );
  }

  return (
    <>
      <Tabs.Root
        defaultValue={node.dir.filer[0].navn}
        onValueChange={(v) => setActiveExample(v)}
      >
        <Tabs.List className="mb-5 flex max-w-xl flex-wrap gap-2">
          {node.dir.filer.map((fil) => {
            return (
              <Tabs.Trigger
                key={fil._key}
                value={fil.navn}
                className={cl(
                  "flex h-8 items-center justify-center  rounded-full text-base ring-inset ring-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800",
                  {
                    "gap-1 bg-gray-200 pr-3 pl-[10px] ring-2 hover:bg-gray-100":
                      activeExample === fil.navn,
                    "bg-white px-3 ring-1 hover:bg-gray-100":
                      activeExample !== fil.navn,
                  }
                )}
              >
                {activeExample === fil.navn && <SuccessStroke aria-hidden />}
                {fixName(fil.navn)}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {node.dir.filer.map((fil) => {
          return (
            <Tabs.Content key={fil._key} value={fil.navn} tabIndex={-1}>
              {fil?.description && (
                <BodyLong className="mb-2">{fil.description}</BodyLong>
              )}
              {element(
                `/eksempler/${node.dir.title}/${fil.navn.replace(".tsx", "")}`,
                fil.innhold
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
};

export default withErrorBoundary(ComponentExamples, "Eksempler kode");
