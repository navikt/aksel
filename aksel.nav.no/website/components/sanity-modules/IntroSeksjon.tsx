import { LevelTwoHeading } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Label } from "@navikt/ds-react";
import React from "react";

const Intro = ({
  node,
}: {
  node: SanityT.Schema.intro_komponent;
}): JSX.Element => {
  if (!node || !node.body || !node.brukes_til) {
    return null;
  }

  return (
    <div className="mb-16">
      <LevelTwoHeading hidden id="intro">
        {["Intro"]}
      </LevelTwoHeading>
      <SanityBlockContent blocks={node.body} />
      <div>
        <>
          <Label as="p" className="mb-3">
            Egnet til:
          </Label>
          <ul className="mb-7 list-disc">
            {node.brukes_til.map((x) => (
              <li
                key={x}
                className="ml-5 mb-3 list-item max-w-[calc(theme(spacing.text)_-_1em)]"
              >
                {x}
              </li>
            ))}
          </ul>
        </>
        {node?.brukes_ikke_til && (
          <>
            <Label as="p" className="mb-3">
              Uegnet til:
            </Label>
            <ul className="list-disc">
              {node.brukes_ikke_til.map((x) => (
                <li
                  key={x}
                  className="ml-5 mb-3 list-item max-w-[calc(theme(spacing.text)_-_1em)]"
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

export default withErrorBoundary(Intro, "Intro komponent");
