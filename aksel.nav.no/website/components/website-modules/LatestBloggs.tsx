import Image from "next/image";
import NextLink from "next/link";
import { dateStr } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { SanityT, urlFor } from "@/lib";

export type BloggPageT = Partial<
  SanityT.Schema.aksel_blogg & {
    slug: string;
    contributors?: { title?: string }[];
  }
>;

const getAuthors = (blog: BloggPageT) =>
  (blog?.contributors as any)?.map((x) => x?.title) ?? [];

const getImage = (n: string, size: "small" | "large") => {
  const smallOptions = 18;
  const largeOptions = 4;

  const hash = Math.abs(
    n.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
  );

  if (size === "small") {
    return `/images/thumbnail-small/Small-${(hash % smallOptions) - 1 + 1}.svg`;
  }
  return `/images/thumbnail-large/Large-${(hash % largeOptions) - 1 + 1}.svg`;
};

export const LatestBlogs = ({
  bloggs,
  title,
}: {
  bloggs: BloggPageT[];
  title: string;
}) => {
  if (!bloggs || bloggs.length < 3) {
    return null;
  }
  return (
    <div>
      <div className="xs:px-4 mx-auto grid w-full max-w-screen-xl gap-6 px-6">
        <Heading
          level="1"
          size="xlarge"
          spacing
          className="algolia-index-lvl1 text-deepblue-800 mx-auto mt-14 w-full max-w-xl md:mx-0 md:max-w-none"
        >
          {title}
        </Heading>
        {/* Desktop-view */}
        <div className="my-20 hidden grid-cols-2 gap-12 md:grid">
          <div className="w-full">
            <div className="relative mb-10 block aspect-video">
              {bloggs[0]?.seo?.image ? (
                <Image
                  src={urlFor(bloggs[0].seo.image).auto("format").url()}
                  decoding="async"
                  layout="fill"
                  objectFit="cover"
                  aria-hidden
                  priority
                  className="rounded-lg"
                />
              ) : (
                <Image
                  src={getImage(bloggs[0]?.heading ?? "", "large")}
                  decoding="async"
                  layout="fill"
                  objectFit="contain"
                  aria-hidden
                  priority
                  className="rounded-lg"
                />
              )}
            </div>
            <Heading size="large" as="a" className="">
              <NextLink href={`/${bloggs[0].slug}`} passHref>
                <Link className="text-deepblue-500 no-underline hover:underline">
                  {bloggs[0].heading}
                </Link>
              </NextLink>
            </Heading>
            <BodyLong className="mt-4">{bloggs[0]?.ingress}</BodyLong>
            {getAuthors(bloggs[0]).length > 0 && (
              <BodyShort
                size="small"
                className="text-text-subtle mt-4 flex gap-2"
              >
                <span className="font-semibold">
                  {getAuthors(bloggs[0])[0]}
                </span>
                <span>
                  {dateStr(bloggs[0]?.publishedAt ?? bloggs[0]._createdAt)}
                </span>
              </BodyShort>
            )}
          </div>
          <div className="grid w-full gap-12">
            {bloggs.slice(1, 4).map((blog) => (
              <div key={blog._id} className="flex gap-6">
                <div className="relative hidden aspect-square h-[11.75rem] lg:block">
                  {blog?.seo?.image ? (
                    <Image
                      src={urlFor(blog.seo.image).auto("format").url()}
                      decoding="async"
                      layout="fill"
                      objectFit="cover"
                      aria-hidden
                      priority
                      className="rounded-lg"
                    />
                  ) : (
                    <Image
                      src={getImage(blog?.heading ?? "", "small")}
                      decoding="async"
                      layout="fill"
                      objectFit="contain"
                      aria-hidden
                      priority
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <Heading size="small" as="a" className="">
                    <NextLink href={`/${blog.slug}`} passHref>
                      <Link className="text-deepblue-500 no-underline hover:underline">
                        {blog.heading}
                      </Link>
                    </NextLink>
                  </Heading>
                  <BodyLong className="mt-4">{blog?.ingress}</BodyLong>
                  {getAuthors(blog).length > 0 && (
                    <BodyShort
                      size="small"
                      className="text-text-subtle mt-4 flex gap-2"
                    >
                      <span className="font-semibold">
                        {getAuthors(blog)[0]}
                      </span>
                      <span>
                        {dateStr(blog?.publishedAt ?? blog._createdAt)}
                      </span>
                    </BodyShort>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="my-20 mx-auto grid max-w-xl gap-12 md:hidden">
          <div className="w-full">
            <div className="relative mb-10 block aspect-video">
              {bloggs[0]?.seo?.image ? (
                <Image
                  src={urlFor(bloggs[0].seo.image).auto("format").url()}
                  decoding="async"
                  layout="fill"
                  objectFit="cover"
                  aria-hidden
                  priority
                  className="rounded-lg"
                />
              ) : (
                <Image
                  src={getImage(bloggs[0]?.heading ?? "", "large")}
                  decoding="async"
                  layout="fill"
                  objectFit="contain"
                  aria-hidden
                  priority
                  className="rounded-lg"
                />
              )}
            </div>
            <Heading size="large" as="a" className="">
              <NextLink href={`/${bloggs[0].slug}`} passHref>
                <Link className="text-deepblue-500 no-underline hover:underline">
                  {bloggs[0].heading}
                </Link>
              </NextLink>
            </Heading>
            <BodyLong className="mt-4">{bloggs[0]?.ingress}</BodyLong>
            {getAuthors(bloggs[0]).length > 0 && (
              <BodyShort
                size="small"
                className="text-text-subtle mt-4 flex gap-2"
              >
                <span className="font-semibold">
                  {getAuthors(bloggs[0])[0]}
                </span>
                <span>
                  {dateStr(bloggs[0]?.publishedAt ?? bloggs[0]._createdAt)}
                </span>
              </BodyShort>
            )}
          </div>
          <div className="grid w-full gap-12">
            {bloggs.slice(1, 4).map((blog) => (
              <div key={blog._id} className="flex gap-6">
                <div className="relative block aspect-square h-[11.75rem]">
                  {blog?.seo?.image ? (
                    <Image
                      src={urlFor(blog.seo.image).auto("format").url()}
                      decoding="async"
                      layout="fill"
                      objectFit="cover"
                      aria-hidden
                      priority
                      className="rounded-lg"
                    />
                  ) : (
                    <Image
                      src={getImage(blog?.heading ?? "", "small")}
                      decoding="async"
                      layout="fill"
                      objectFit="contain"
                      aria-hidden
                      priority
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <Heading size="small" as="a" className="">
                    <NextLink href={`/${blog.slug}`} passHref>
                      <Link className="text-deepblue-500 no-underline hover:underline">
                        {blog.heading}
                      </Link>
                    </NextLink>
                  </Heading>
                  <BodyLong className="mt-4">{blog?.ingress}</BodyLong>
                  {getAuthors(blog).length > 0 && (
                    <BodyShort
                      size="small"
                      className="text-text-subtle mt-4 flex gap-2"
                    >
                      <span className="font-semibold">
                        {getAuthors(blog)[0]}
                      </span>
                      <span>
                        {dateStr(blog?.publishedAt ?? blog._createdAt)}
                      </span>
                    </BodyShort>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
