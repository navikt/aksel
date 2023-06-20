import { SanityBlockContent } from "@/sanity-block";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { Heading } from "@navikt/ds-react";
import { BloggList } from "./BloggList";
import { HighlightedBlogg } from "./HighlightedBlogg";

export const LatestBloggposts = ({
  bloggs,
  title,
  intro,
}: {
  bloggs: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>[];
  title: string;
  intro?: any[];
}) => {
  if (!bloggs || bloggs.length < 3) {
    return null;
  }

  return (
    <div className="mt-20">
      <Heading
        level="1"
        size="xlarge"
        className="text-deepblue-700 mx-auto w-full text-5xl md:mx-0 md:max-w-none"
      >
        {title}
      </Heading>
      {intro && (
        <SanityBlockContent
          blocks={intro}
          isIngress
          noLastMargin
          className="mt-4"
        />
      )}
      {/* Desktop-view */}
      <div className="mx-auto my-10 grid gap-12 md:my-12 md:grid-cols-2">
        <HighlightedBlogg blogg={bloggs[0]} />
        <div className="col-span-1 grid place-content-start gap-12">
          {bloggs.slice(1, 3).map((blogg) => (
            <BloggList blogg={blogg} key={blogg._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
