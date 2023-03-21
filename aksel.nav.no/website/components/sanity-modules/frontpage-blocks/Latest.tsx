import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { withErrorBoundary } from "@/error-boundary";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { urlFor } from "lib/sanity/santiy";
import { getImage } from "components/website-modules/utils/get-image";
import { getAuthors } from "components/website-modules/LatestBloggs";
import { dateStr } from "@/utils";
import { Tag } from "./Tag";
import { Card, ArticleT } from "./Card";
import cl from "clsx";

export type LatestT = {
  _type: "nytt_fra_aksel";
  _key: string;
  highlights: ArticleT[];
  curatedResent: {
    artikler: ArticleT[];
    bloggposts: ArticleT[];
    komponenter: ArticleT[];
  };
};

const Latest = ({ block }: { block: LatestT }) => {
  const highlights = block.highlights?.length;

  const articles = [
    ...block.curatedResent.artikler,
    ...block.curatedResent.bloggposts,
    ...block.curatedResent.komponenter,
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <Heading level="3" size="xlarge" className="text-deepblue-800 mb-12">
        Siste fra Aksel
      </Heading>

      {highlights && <Highlights highlights={block.highlights} />}
      <div className="mt-12">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 480: 1, 768: 2, 1024: 3 }}
        >
          <Masonry gutter="1.5rem">
            {articles.map((x) => (
              <Card key={x._id} article={x} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

function Highlights({ highlights }: { highlights: ArticleT[] }) {
  return (
    <div
      className={cl({ "grid gap-8 md:grid-cols-2": highlights?.length === 2 })}
    >
      {highlights.map((x, idx) => {
        const useStatusImage =
          ["ds_artikkel", "komponent_artikkel"].includes(x._type) &&
          x.status?.bilde;
        return (
          <div
            key={idx}
            className={cl({
              "grid content-start gap-8 md:grid-cols-2":
                highlights?.length === 1,
              "grid content-start gap-6": highlights?.length === 2,
            })}
          >
            <div className="relative block aspect-video">
              {useStatusImage ? (
                <Image
                  src={urlFor(x.status.bilde).quality(100).auto("format").url()}
                  quality={100}
                  layout="fill"
                  aria-hidden
                  priority
                  className={cl(
                    "bg-deepblue-200 rounded-lg object-cover sm:object-contain",
                    {
                      "hue-rotate-[65deg]": x?.status?.tag === "beta",
                    }
                  )}
                  decoding="sync"
                />
              ) : x?.seo?.image ? (
                <Image
                  src={urlFor(x.seo.image).quality(100).auto("format").url()}
                  quality={100}
                  layout="fill"
                  objectFit="cover"
                  aria-hidden
                  priority
                  className={cl("rounded-lg", {
                    "hue-rotate-[65deg]": x?.status?.tag === "beta",
                  })}
                  decoding="sync"
                />
              ) : (
                <Image
                  src={getImage(x?.heading ?? "", "thumbnail")}
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
              <Tag type={x._type} text={x.tema ? x.tema[0] : undefined} />
              <NextLink href={`/${x.slug.current}`} passHref legacyBehavior>
                <Link className="text-text-default mb-5 mt-3 no-underline hover:underline">
                  <Heading size="large" level="3">
                    {x?.heading}
                  </Heading>
                </Link>
              </NextLink>
              <BodyLong className="mb-5" size="small">
                {x?.ingress ?? x.seo?.meta}
              </BodyLong>
              {getAuthors(x as any).length > 0 && (
                <BodyShort size="small" className="text-text-subtle flex gap-2">
                  <span className="font-semibold">
                    {getAuthors(x as any)[0]}
                  </span>
                  <span>{dateStr(x?.publishedAt ?? x._createdAt)}</span>
                </BodyShort>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withErrorBoundary(Latest, "Latest");
