import Image from "next/image";
import NextLink from "next/link";
import { dateStr } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { SanityT, urlFor } from "@/lib";
import cl from "classnames";

export type BloggPageT = Partial<
  SanityT.Schema.aksel_blogg & {
    slug: string;
    contributors?: { title?: string }[];
  }
>;

export const getAuthors = (blog: BloggPageT) =>
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

export const LatestBloggposts = ({
  bloggs,
  title,
  variant = "blogg",
  level = "1",
}: {
  bloggs: BloggPageT[];
  title: string;
  variant?: "blogg" | "forside";
  level?: "1" | "2";
}) => {
  if (!bloggs || bloggs.length < 3) {
    return null;
  }

  return (
    <div
      className={cl({
        "mt-14": variant === "blogg",
      })}
    >
      <Heading
        level={level}
        size="xlarge"
        className="algolia-index-lvl1 text-deepblue-800 mx-auto w-full md:mx-0 md:max-w-none"
      >
        {title}
      </Heading>
      {/* Desktop-view */}
      <div
        className={cl("hidden gap-12", {
          "my-10 md:flex": variant === "forside",
          "my-20 grid-cols-2 md:grid": variant === "blogg",
        })}
      >
        <div
          className={cl({
            "flex-auto grow-[4]": variant === "forside",
            "col-span-1": variant === "blogg",
          })}
        >
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
          <NextLink href={`/${bloggs[0].slug}`} passHref>
            <Link className="text-deepblue-500 no-underline hover:underline">
              <Heading
                size="large"
                level={(Number(level) + 1).toString() as any}
              >
                {bloggs[0].heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className="mt-4" size="small">
            {bloggs[0]?.ingress}
          </BodyLong>
          {getAuthors(bloggs[0]).length > 0 && (
            <BodyShort
              size="small"
              className="text-text-subtle mt-4 flex gap-2"
            >
              <span className="font-semibold">{getAuthors(bloggs[0])[0]}</span>
              <span>
                {dateStr(bloggs[0]?.publishedAt ?? bloggs[0]._createdAt)}
              </span>
            </BodyShort>
          )}
        </div>
        <div
          className={cl("gap-12", {
            "flex flex-auto grow-[1] place-items-start": variant === "forside",
            "col-span-1 grid": variant === "blogg",
          })}
        >
          <div className={cl("grid gap-12")}>
            {bloggs.slice(1, 4).map((blog) => (
              <div
                key={blog._id}
                className={cl("flex gap-6", {
                  "border-b-border-subtle border-b pb-8": variant === "forside",
                })}
              >
                {variant === "blogg" && (
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
                )}
                <div>
                  <NextLink href={`/${blog.slug}`} passHref>
                    <Link className="text-deepblue-500 no-underline hover:underline">
                      <Heading
                        size="small"
                        level={(Number(level) + 1).toString() as any}
                      >
                        {blog.heading}
                      </Heading>
                    </Link>
                  </NextLink>
                  <BodyLong className="mt-4" size="small">
                    {blog?.ingress}
                  </BodyLong>
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

      {/* Mobile view */}
      <div className="my-10 mx-auto grid gap-12 md:hidden">
        <div
          className={cl("w-full", {
            "border-b-border-subtle border-b pb-8": variant === "forside",
          })}
        >
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
          <NextLink href={`/${bloggs[0].slug}`} passHref>
            <Link className="text-deepblue-500 no-underline hover:underline">
              <Heading
                size="large"
                level={(Number(level) + 1).toString() as any}
              >
                {bloggs[0].heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className="mt-4" size="small">
            {bloggs[0]?.ingress}
          </BodyLong>
          {getAuthors(bloggs[0]).length > 0 && (
            <BodyShort
              size="small"
              className="text-text-subtle mt-4 flex gap-2"
            >
              <span className="font-semibold">{getAuthors(bloggs[0])[0]}</span>
              <span>
                {dateStr(bloggs[0]?.publishedAt ?? bloggs[0]._createdAt)}
              </span>
            </BodyShort>
          )}
        </div>
        <div className="grid w-full gap-12">
          {bloggs.slice(1, 4).map((blog) => (
            <div
              key={blog._id}
              className={cl({
                "border-b-border-subtle border-b pb-8": variant === "forside",
              })}
            >
              {variant === "blogg" && (
                <div className="relative mb-6 block aspect-video">
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
              )}
              <div>
                <NextLink href={`/${blog.slug}`} passHref>
                  <Link className="text-deepblue-500 no-underline hover:underline">
                    <Heading
                      size="small"
                      level={(Number(level) + 1).toString() as any}
                    >
                      {blog.heading}
                    </Heading>
                  </Link>
                </NextLink>
                <BodyLong className="mt-4" size="small">
                  {blog?.ingress}
                </BodyLong>
                {getAuthors(blog).length > 0 && (
                  <BodyShort
                    size="small"
                    className="text-text-subtle mt-4 flex gap-2"
                  >
                    <span className="font-semibold">{getAuthors(blog)[0]}</span>
                    <span>{dateStr(blog?.publishedAt ?? blog._createdAt)}</span>
                  </BodyShort>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
