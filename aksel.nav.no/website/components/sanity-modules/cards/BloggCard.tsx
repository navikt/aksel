import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { amplitudeLogNavigation } from "@/logging";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { getAuthors } from "@/utils";

type BloggCardProps = {
  blog: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
};

const BloggCard = ({ blog }: BloggCardProps) => {
  const date = useFormatedDate(blog?.publishedAt ?? blog._createdAt);
  return (
    <li
      key={blog._id}
      className="flex h-full flex-col place-content-start border-b border-b-border-subtle pb-8"
    >
      <Heading size="medium" as="div">
        <NextLink href={`/${blog.slug}`} passHref legacyBehavior>
          <Link
            className="text-deepblue-500 underline hover:no-underline"
            onClick={(e) =>
              amplitudeLogNavigation(
                "blogg-card",
                e.currentTarget.getAttribute("href"),
              )
            }
          >
            {blog.heading}
          </Link>
        </NextLink>
      </Heading>
      <BodyLong className="my-2">{blog?.ingress}</BodyLong>
      {getAuthors(blog).length > 0 && (
        <BodyShort
          size="small"
          className="mt-auto flex gap-2 justify-self-end text-text-subtle"
        >
          <span className="font-semibold">{getAuthors(blog)[0]}</span>
          <span>{date}</span>
        </BodyShort>
      )}
    </li>
  );
};

export default function Component(props: BloggCardProps) {
  return (
    <ErrorBoundary boundaryName="ArtikkelCard">
      <BloggCard {...props} />
    </ErrorBoundary>
  );
}
