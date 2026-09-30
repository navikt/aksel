"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Masonry from "react-responsive-masonry";
import { Box, HGrid, Heading } from "@navikt/ds-react";
import { useMedia } from "@/app/_ui/utils/hooks/useMedia";
import Card, { type ArticleT } from "./FrontpageMasonryCard";
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

  /* ResponsiveMasonry reads window.innerWidth on first render, causing hydration mismatch */
  const isLarge = useMedia("(min-width: 1025px)");
  const isMedium = useMedia("(min-width: 769px)");
  const columnsCount = isLarge ? 3 : isMedium ? 2 : 1;

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
        <Masonry gutter="1.5rem" columnsCount={columnsCount}>
          {articles.map((x, index) => (
            <Card key={x._id} article={x} index={index} visible={intersected} />
          ))}
        </Masonry>
      </section>
    </>
  );
};

function Highlights({ highlights }: { highlights: ArticleT[] }) {
  return (
    <HGrid gap="space-32" columns={{ xs: 1, md: 2 }}>
      {highlights.map((x) => (
        <Highlight article={x} key={x._id} compact={highlights.length === 1} />
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
    <Box className={className}>
      {latest.map((x) => {
        switch (x._type) {
          case "nytt_fra_aksel":
            return <Latest block={x} key={x._key} />;
          default:
            return null;
        }
      })}
    </Box>
  );
};
