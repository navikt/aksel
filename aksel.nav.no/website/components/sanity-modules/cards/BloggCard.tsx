import { SanityT } from "@/lib";
import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";
import NextLink from "next/link";
import { dateStr, dateTimeStr, logNav } from "../..";

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
    <div className="grid grid-flow-row-dense grid-cols-[1fr_auto] items-start gap-x-8 py-8">
      <Detail
        as="time"
        size="small"
        className="text-text-subtle xs:col-span-1 col-span-2 uppercase tracking-wide"
        dateTime={dateTimeStr(blog?.publishedAt ?? blog._createdAt)}
      >
        {dateStr(blog?.publishedAt ?? blog._createdAt)}
      </Detail>
      <Heading
        level="3"
        size="large"
        className="xs:col-span-1 col-span-2 col-start-1 text-gray-800"
      >
        <NextLink href={`/${blog.slug}`} passHref>
          <Link
            onClick={(e) =>
              logNav(
                "blog-kort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
            className="text-deepblue-700 no-underline hover:underline"
          >
            {blog.heading}
          </Link>
        </NextLink>
      </Heading>
      <BodyLong className="col-start-1 mt-1 text-gray-800">
        {blog?.ingress}
      </BodyLong>
      <div className="xs:row-start-1 col-start-2 row-span-3 row-start-3">
        {/* <img
  className="mt-3 aspect-square w-24 bg-gray-200 sm:mt-0 sm:w-32"
  src=""
  alt=""
/> */}
      </div>
    </div>
  );
};

export default BloggCard;
