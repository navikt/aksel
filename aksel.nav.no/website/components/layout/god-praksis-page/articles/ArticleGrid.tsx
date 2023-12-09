import cl from "clsx";
import { HGrid } from "@navikt/ds-react";
import { GpArticleT } from "@/layout/god-praksis-page/types";
import { ArticleCard } from "./ArticleCard";
import styles from "./articles.module.css";

type ArticleGridT = {
  initialData: GpArticleT[];
  data: GpArticleT[];
  loaded: boolean;
};

function ArticleGrid({ data, initialData, loaded }: ArticleGridT) {
  if (!initialData) {
    /* TODO: Emptystate? */
    return null;
  }
  return (
    <div>
      {loaded && (
        <HGrid
          gap="6"
          columns={{ xs: 1, md: 2, lg: 3 }}
          className={cl("pt-5", styles.articleGrid)}
        >
          {initialData.map((article, idx) => (
            <ArticleCard key={article._id + idx} group="initial" {...article} />
          ))}
          {data.map((article, idx) => (
            <ArticleCard
              key={idx}
              group="lazy"
              delay={((idx % 3) + 1) * 300}
              {...article}
            />
          ))}
        </HGrid>
      )}
    </div>
  );
}

export default ArticleGrid;
