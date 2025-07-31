"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BoxNew, HGrid, Heading } from "@navikt/ds-react";
import Card, { ArticleT } from "./FrontpageMasonryCard";
import { Highlight } from "./HighlightedArticle";
import styles from "./frontpage.module.css";

export type LatestT = {
  _type: "nytt_fra_aksel";
  _key: string;
  highlights: ArticleT[];
  curatedRecent: {
    artikler: ArticleT[];
    bloggposts: ArticleT[];
    komponenter: ArticleT[];
  };
};

type LatestArticlesProps = {
  block: LatestT;
};

const Latest = ({ block }: LatestArticlesProps) => {
  const highlights = block.highlights?.length;
  const [intersected, setIntersected] = useState(false);
  const section = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && setIntersected(entry.isIntersecting);
      },
      { rootMargin: "0px 0px 100px 0px" },
    );
    section.current && observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  const articles = useMemo(() => getList(block), [block]);

  return (
    <>
      <Heading level="2" size="xlarge" className={styles.latestHeading}>
        Siste fra Aksel og produktteamene
      </Heading>

      {highlights && <Highlights highlights={block.highlights} />}
      <section
        ref={section}
        aria-label="Nyeste artikler fra Aksel"
        className={styles.latestSection}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 480: 1, 768: 2, 1024: 3 }}
        >
          <Masonry gutter="1.5rem">
            {articles.map((x, index) => (
              <Card
                key={x._id}
                article={x}
                index={index}
                visible={intersected}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    </>
  );
};

function Highlights({ highlights }: { highlights: ArticleT[] }) {
  return (
    <HGrid gap="space-32" columns={{ xs: 1, md: 2 }}>
      {highlights.map((x, idx) => (
        <Highlight article={x} key={idx} compact={highlights.length === 1} />
      ))}
    </HGrid>
  );
}

function getList(block: LatestT) {
  return [
    ...block.curatedRecent.artikler,
    ...block.curatedRecent.bloggposts,
    ...block.curatedRecent.komponenter,
  ].sort((a, b) => {
    return (
      new Date(b.publishedAt ?? "").getTime() -
      new Date(a.publishedAt ?? "").getTime()
    );
  });
}

export const FrontpageLatest = ({
  latest,
  className,
}: {
  latest: LatestT[];
  className?: string;
}) => {
  return (
    <BoxNew className={className}>
      {latest.map((x) => {
        switch (x._type) {
          case "nytt_fra_aksel":
            return <Latest block={x} key={x._key} />;
          default:
            return null;
        }
      })}
    </BoxNew>
  );
};
