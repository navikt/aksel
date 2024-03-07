import { BodyLong, Heading } from "@navikt/ds-react";

type HeroIntroProps = {
  title?: string;
  description?: string;
  hidden?: boolean;
};

export function HeroIntro({ title, description, hidden }: HeroIntroProps) {
  if (!title) return null;
  return (
    <div className="relative z-10" aria-hidden={hidden}>
      <Heading level="1" size="xlarge" className="z-10 mt-2 text-aksel-heading">
        {title}
      </Heading>
      {description && (
        <BodyLong size="large" className="relative z-10 mt-4">
          {description}
        </BodyLong>
      )}
    </div>
  );
}
