import { BodyLong, Heading } from "@navikt/ds-react";

export const BetaWarning = () => {
  return (
    <div className="bg-surface-alt-1-subtle mb-7 rounded p-4">
      <Heading level="2" size="small" spacing>
        Beta
      </Heading>
      <BodyLong className="override-text-no-max mb-2">
        Komponenten er under utvikling. Dette kan medføre breaking-changes i
        patch/minor versjon av kodepakker. Teamet ditt må selv ta stilling til
        om dere ønsker å bruke denne i produksjon.
      </BodyLong>
      <BodyLong className="override-text-no-max">
        Har du innspill eller funnet en bug? Send oss en melding her eller på
        slack! Beta-versjon er ment for rask iterering, så alle innspill
        hjelper.
      </BodyLong>
    </div>
  );
};
