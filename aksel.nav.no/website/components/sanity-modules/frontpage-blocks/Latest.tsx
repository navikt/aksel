import { withErrorBoundary } from "@/error-boundary";
import { Heading } from "@navikt/ds-react";
import cl from "clsx";
import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card, { ArticleT } from "./Card";
import { Highlight } from "./Highlight";

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
  const [intersected, setIntersected] = useState(false);
  const section = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && setIntersected(entry.isIntersecting);
      },
      { rootMargin: "0px 0px 100px 0px" }
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  const articles = getList(block);

  return (
    <>
      <Heading level="2" size="xlarge" className="text-deepblue-800 mb-10">
        Siste fra Aksel
      </Heading>

      {highlights && <Highlights highlights={block.highlights} />}
      <section
        ref={section}
        aria-label="Nyeste artikler fra Aksel"
        className="mt-20"
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
    <div
      className={cl({ "grid gap-8 md:grid-cols-2": highlights?.length === 2 })}
    >
      {highlights.map((x, idx) => (
        <Highlight article={x} key={idx} compact={highlights.length === 1} />
      ))}
    </div>
  );
}

function getList(block: LatestT) {
  return [
    ...block.curatedResent.artikler,
    ...block.curatedResent.bloggposts,
    ...block.curatedResent.komponenter,
  ].sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
}

export default withErrorBoundary(Latest, "Latest");
