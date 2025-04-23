import { Heading, Show } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { HighlightedBlogg } from "./HighlightedBlogg";

export const LatestBloggposts = ({
  bloggs,
  title,
  intro,
}: {
  bloggs: any;
  title: string;
  intro: any[] | null;
}) => {
  if (!bloggs || bloggs.length < 3) {
    return null;
  }

  return (
    <div className="mt-20">
      <Heading
        level="1"
        size="xlarge"
        spacing
        className="mx-auto w-full text-5xl text-aksel-heading md:mx-0 md:max-w-none"
      >
        {title}
      </Heading>
      {intro && <CustomPortableText value={intro} />}
      {/* Desktop-view */}
      <div className="mx-auto my-10 grid gap-12 md:my-12 md:grid-cols-2">
        <HighlightedBlogg blogg={bloggs[0]} />
        <Show above="md">
          <HighlightedBlogg blogg={bloggs[1]} />
        </Show>
      </div>
    </div>
  );
};
