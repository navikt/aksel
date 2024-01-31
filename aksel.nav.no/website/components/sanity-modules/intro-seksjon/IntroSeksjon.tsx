import { Label } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AkselGrunnleggendeDocT, AkselKomponentDocT } from "@/types";

type IntroProps = {
  node: AkselKomponentDocT["intro"] | AkselGrunnleggendeDocT["intro"];
  internal?: boolean;
};

const Intro = ({ node, internal }: IntroProps) => {
  if (!node || !node.body || !node.brukes_til) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 id="intro" className="sr-only">
        Intro
      </h2>
      <SanityBlockContent blocks={node.body} />
      <div className="mt-7">
        <Label as="p" className="mb-3">
          Egnet til:
        </Label>
        <ul className="mb-7 list-disc">
          {internal && (
            <li className="mb-3 ml-5 list-item max-w-[calc(theme(spacing.text)_-_1em)]">
              Bruk på interne flater
            </li>
          )}
          {node.brukes_til.map((x) => (
            <li
              key={x}
              className="mb-3 ml-5 list-item max-w-[calc(theme(spacing.text)_-_1em)]"
            >
              {x}
            </li>
          ))}
        </ul>
        {node?.brukes_ikke_til && (
          <>
            <Label as="p" className="mb-3">
              Uegnet til:
            </Label>
            <ul className="list-disc">
              {node.brukes_ikke_til.map((x) => (
                <li
                  key={x}
                  className="mb-3 ml-5 list-item max-w-[calc(theme(spacing.text)_-_1em)]"
                >
                  {x}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default function Component(props: IntroProps) {
  return (
    <ErrorBoundary boundaryName="Intro-modul">
      <Intro {...props} />
    </ErrorBoundary>
  );
}
