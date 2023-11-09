import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";
import { urlFor } from "@/sanity/interface";
import { abbrName, getImage } from "@/utils";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import cl from "clsx";
import NextImage from "next/legacy/image";
import NextLink from "next/link";
import { Tag } from "./Tag";
import { useFormatedDate } from "@/hooks/useFormatedDate";

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

type CardProps = {
  article: ArticleT;
  visible: boolean;
  index: number;
};

const Card = ({ article, visible, index }: CardProps) => {
  const date = useFormatedDate(article.publishedAt ?? article._updatedAt);

  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  const showImage = [
    "ds_artikkel",
    "komponent_artikkel",
    "aksel_blogg",
    "templates_artikkel",
  ].includes(article._type);

  return (
    <div
      className={cl(
        "bg-surface-default group relative rounded-lg",
        "focus-within:ring-border-focus ring-border-subtle-hover shadow-xsmall hover:shadow-small focus-within:ring-[3px]",
        `transition-[opacity,transform] duration-700`,
        {
          "translate-y-0 opacity-100": visible,
          "translate-y-12 opacity-0": !visible,
        }
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
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
          {article.status?.bilde ?? article.seo?.image ? (
            article.status?.bilde ? (
              <NextImage
                src={urlFor(article.status?.bilde).auto("format").url()}
                width="200"
                height="200"
                alt={article.heading + " thumbnail"}
                aria-hidden
              />
            ) : (
              <div className="relative h-[200px] w-full">
                <NextImage
                  src={urlFor(article.seo?.image).auto("format").url()}
                  layout="fill"
                  objectFit="cover"
                  alt={article.heading + " thumbnail"}
                  aria-hidden
                  className="rounded-t-lg"
                />
              </div>
            )
          ) : (
            <div className="relative h-[200px] w-full">
              <NextImage
                layout="fill"
                objectFit="cover"
                src={getImage(article?.heading ?? "", "thumbnail")}
                alt={article.heading + " thumbnail"}
                aria-hidden
                className="rounded-t-lg"
              />
            </div>
          )}
        </div>
      )}
      <div className={cl("p-3 sm:p-5", showFooter && "pb-16 sm:pb-16")}>
        <div className="flex flex-col-reverse">
          <NextLink
            href={`/${article.slug}`}
            passHref
            className="after:absolute after:inset-0 after:z-10 after:rounded-lg focus:outline-none"
            onClick={(e) =>
              amplitudeLogNavigation(
                "forside-masonary",
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <Heading
              level="3"
              size="small"
              className="underline group-hover:no-underline"
            >
              {article.heading}
            </Heading>
          </NextLink>
          <Tag
            type={article._type}
            text={article.tema ? article.tema[0] : undefined}
            size="xsmall"
            beta={article.status?.tag === "beta"}
          />
        </div>
        {article.ingress ? (
          <BodyShort className="mt-2">{article.ingress}</BodyShort>
        ) : article.seo?.meta ? (
          <BodyShort className="mt-2">{article.seo.meta}</BodyShort>
        ) : null}
        {showFooter && (
          <span className="text-text-subtle absolute bottom-5 flex gap-2">
            {article?.contributors && (
              <Detail as="span" className="font-semibold">
                {abbrName(article?.contributors[0]?.title)}
              </Detail>
            )}
            <Detail as="span">{date}</Detail>
          </span>
        )}
      </div>
    </div>
  );
};

export default function Component(props: CardProps) {
  return (
    <ErrorBoundary boundaryName="FrontpageBlockCard">
      <Card {...props} />
    </ErrorBoundary>
  );
}
