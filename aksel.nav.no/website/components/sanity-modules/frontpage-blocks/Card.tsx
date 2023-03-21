import { abbrName, dateStr } from "@/utils";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { logNav } from "components/website-modules/utils/amplitude";
import NextLink from "next/link";
import NextImage from "next/image";
import { Tag } from "./Tag";
import cl from "clsx";
import { urlFor } from "lib/sanity/santiy";

export type ArticleT = {
  _key: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  heading: string;
  ingress?: string;
  slug: { current: string };
  seo?: {
    meta?: string;
    image?: any;
  };
  tema?: string[];
  status?: { tag: string; bilde?: any };
  publishedAt: string;
  contributors?: { title: string }[];
};

export const Card = ({ article }: { article: ArticleT }) => {
  const date = article.publishedAt ? article.publishedAt : article._updatedAt;

  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  const showImage =
    ["ds_artikkel", "komponent_artikkel"].includes(article._type) &&
    article.status?.bilde;

  return (
    <section
      aria-label={article?.heading}
      className={cl(
        "bg-surface-default group relative rounded-lg",
        "focus-within:ring-border-focus ring-border-subtle-hover focus-within:ring-[3px]",
        "shadow-[0_0_1px_rgb(0_0_0/0.3),0_1px_3px_rgb(0_0_0/0.15)]"
      )}
    >
      {showImage && (
        <div
          className={cl(
            "flex max-h-80 items-center justify-center overflow-hidden rounded-t-lg",
            "bg-deepblue-200 filter",
            {
              "hue-rotate-[65deg]": article?.status?.tag === "beta",
            }
          )}
        >
          <NextImage
            src={urlFor(article.status?.bilde).auto("format").url()}
            width="200"
            height="200"
            alt={article.heading + " thumbnail"}
            aria-hidden
          />
        </div>
      )}
      <div className={cl("p-3 sm:p-5", showFooter && "pb-16 sm:pb-16")}>
        <Tag
          type={article._type}
          text={article.tema ? article.tema[0] : undefined}
          size="small"
        />
        <NextLink
          href={`/${article.slug.current}`}
          passHref
          className="after:absolute after:inset-0 after:z-10 after:rounded-lg focus:outline-none"
          onClick={(e) =>
            logNav(
              "forside-masonary",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          <Heading level="3" size="small" className="group-hover:underline">
            {article.heading}
          </Heading>
        </NextLink>
        {article.ingress ? (
          <BodyShort className="mt-2">{article.ingress}</BodyShort>
        ) : article.seo.meta ? (
          <BodyShort className="mt-2">{article.seo.meta}</BodyShort>
        ) : null}
        {showFooter && (
          <span className="text-text-subtle absolute bottom-5 flex gap-2">
            {article?.contributors && (
              <Detail as="span" className="font-semibold">
                {abbrName(article?.contributors[0]?.title)}
              </Detail>
            )}
            <Detail as="span">{dateStr(date)}</Detail>
          </span>
        )}
      </div>
    </section>
  );
};
