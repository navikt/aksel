import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { urlFor } from "lib/sanity/santiy";
import { getImage } from "components/website-modules/utils/get-image";
import { getAuthors } from "components/website-modules/LatestBloggs";
import { dateStr } from "@/utils";
import { Tag } from "./Tag";
import cl from "clsx";

export type LatestT = {
  _type: "nytt_fra_aksel";
  _key: string;
  highlights: any[];
  curatedResent: any;
};

export const Latest = ({ block }: { block: LatestT }) => {
  const highlights = block.highlights?.length;
  return (
    <>
      <Heading level="3" size="xlarge" className="text-deepblue-800 mb-12">
        Siste fra Aksel
      </Heading>

      {highlights && <Highlights highlights={block.highlights} />}
      {/* Masonary-cloud */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 480: 1, 768: 2, 1024: 3 }}>
        <Masonry gutter="1.5rem">
          {/* {resent.map((art: any) => (
      <ArtikkelCard
        level="4"
        variant="tema"
        {...art}
        key={art._id}
      />
    ))} */}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

const Highlights = ({ highlights }: { highlights: any[] }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative block aspect-video md:aspect-auto lg:aspect-video">
        {highlights[0]?.seo?.image ? (
          <Image
            src={urlFor(highlights[0].seo.image)
              .quality(100)
              .auto("format")
              .url()}
            quality={100}
            layout="fill"
            objectFit="cover"
            aria-hidden
            priority
            className="rounded-lg"
            decoding="sync"
          />
        ) : (
          <Image
            src={getImage(highlights[0]?.heading ?? "", "thumbnail")}
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
        <Tag type={highlights[0]._type} />
        <NextLink
          href={`/${highlights[0].slug.current}`}
          passHref
          legacyBehavior
        >
          <Link className="text-text-default mb-5 mt-3 no-underline hover:underline">
            <Heading size="large" level="3">
              {highlights[0]?.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mb-5" size="small">
          {highlights[0]?.ingress}
        </BodyLong>
        {getAuthors(highlights[0]).length > 0 && (
          <BodyShort size="small" className="text-text-subtle flex gap-2">
            <span className="font-semibold">
              {getAuthors(highlights[0])[0]}
            </span>
            <span>
              {dateStr(highlights[0]?.publishedAt ?? highlights[0]._createdAt)}
            </span>
          </BodyShort>
        )}
      </div>
    </div>
  );
};
