import { SanityT } from "@/lib";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { getAuthors } from "components/website-modules/LatestBloggs";
import NextLink from "next/link";
import { dateStr, logNav } from "../..";

export const BloggCard = ({
  blog,
}: {
  blog: Partial<
    SanityT.Schema.aksel_blogg & {
      slug: string;
      contributors?: {
        title?: string;
      }[];
    }
  >;
}) => {
  return (
    <li key={blog._id} className="border-b-border-subtle border-b pb-8">
      <Heading size="medium" as="div">
        <NextLink href={`/${blog.slug}`} passHref>
          <Link
            className="text-deepblue-500 no-underline hover:underline"
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
      <BodyLong className="mt-2">{blog?.ingress}</BodyLong>
      {getAuthors(blog).length > 0 && (
        <BodyShort size="small" className="text-text-subtle mt-6 flex gap-2">
          <span className="font-semibold">{getAuthors(blog)[0]}</span>
          <span>{dateStr(blog?.publishedAt ?? blog._createdAt)}</span>
        </BodyShort>
      )}
    </li>
  );
};

export default BloggCard;
