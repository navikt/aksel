import { urlFor } from "@/sanity/interface";
import { getAuthors, logNav } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import cl from "clsx";
import { getImage } from "components/website-modules/utils/get-image";
import { useFormatedDate } from "components/website-modules/utils/getDate";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { ArticleT } from "./Card";
import { Tag } from "./Tag";

export const Highlight = ({
  article,
  compact,
}: {
  article: ArticleT;
  compact: boolean;
}) => {
  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  const useStatusImage =
    ["ds_artikkel", "komponent_artikkel"].includes(article._type) &&
    article.status?.bilde;

  const date = useFormatedDate(article?.publishedAt ?? article._createdAt);

  return (
    <section
      aria-label={`Fremhevet artikkel: ${article?.heading}`}
      className={cl({
        "grid content-start gap-8 md:grid-cols-2": compact,
        "grid content-start gap-6": !compact,
      })}
    >
      <div className="relative block aspect-video">
        {useStatusImage ? (
          <Image
            src={urlFor(article.status.bilde).quality(100).auto("format").url()}
            quality={100}
            layout="fill"
            aria-hidden
            priority
            className={cl(
              "bg-deepblue-200 rounded-lg object-cover sm:object-contain",
              {
                "hue-rotate-[65deg]": article?.status?.tag === "beta",
              }
            )}
            decoding="sync"
          />
        ) : article?.seo?.image ? (
          <Image
            src={urlFor(article.seo.image).quality(100).auto("format").url()}
            quality={100}
            layout="fill"
            objectFit="cover"
            aria-hidden
            priority
            className={cl("rounded-lg", {
              "hue-rotate-[65deg]": article?.status?.tag === "beta",
            })}
            decoding="sync"
          />
        ) : (
          <Image
            src={getImage(article?.heading ?? "", "thumbnail")}
            layout="fill"
            objectFit="contain"
            aria-hidden
            priority
            className="rounded-lg"
            decoding="sync"
          />
        )}
      </div>
      <div>
        <Tag
          type={article._type}
          text={article.tema ? article.tema[0] : undefined}
          beta={article?.status?.tag === "beta"}
        />
        <NextLink href={`/${article.slug.current}`} passHref legacyBehavior>
          <Link
            onClick={(e) =>
              logNav(
                "artikkel-kort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
            className="text-text-default mb-5 mt-2 no-underline hover:underline"
          >
            <Heading size="large" level="3">
              {article?.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mb-4" size="small">
          {article?.ingress ?? article.seo?.meta}
        </BodyLong>
        {showFooter && getAuthors(article as any).length > 0 && (
          <BodyShort size="small" className="text-text-subtle flex gap-2">
            <span className="font-semibold">
              {getAuthors(article as any)[0]}
            </span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </section>
  );
};
