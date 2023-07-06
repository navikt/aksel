import { withErrorBoundary } from "@/error-boundary";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { useFormatedDate } from "components/website-modules/utils/getDate";
import NextLink from "next/link";
import { getAuthors, logNav } from "@/utils";

const BloggCard = ({
  blog,
}: {
  blog: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
}) => {
  const date = useFormatedDate(blog?.publishedAt ?? blog._createdAt);
  return (
    <li
      key={blog._id}
      className="border-b-border-subtle flex h-full flex-col place-content-start border-b pb-8"
    >
      <Heading size="medium" as="div">
        <NextLink href={`/${blog.slug}`} passHref legacyBehavior>
          <Link
            className="text-deepblue-500 underline hover:no-underline"
            onClick={(e) =>
              logNav(
                "blogg-card",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
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
          className="text-text-subtle mt-auto flex gap-2 justify-self-end"
        >
          <span className="font-semibold">{getAuthors(blog)[0]}</span>
          <span>{date}</span>
        </BodyShort>
      )}
    </li>
  );
};

export default withErrorBoundary(BloggCard, "BloggCard");
