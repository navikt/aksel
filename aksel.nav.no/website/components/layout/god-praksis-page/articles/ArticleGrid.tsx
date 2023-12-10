import cl from "clsx";
import { GpArticleT } from "@/layout/god-praksis-page/types";
import { ArticleCard } from "./ArticleCard";
import styles from "./articles.module.css";

type ArticleGridT = {
  initialData: GpArticleT[];
  data: GpArticleT[];
  loaded: boolean;
};

/**
 * TODO:
 * - Does this need to be a separate component from `ArticleList`?
 * - Don`t use `loaded` as a prop here. Parent-component rendering this should just not render it if !loaded
 */
function ArticleGrid({ data, initialData, loaded }: ArticleGridT) {
  if (!initialData) {
    /**
     * TODO:
     * - Add content for emptystate here
     */
    return null;
  }
  return (
    <div>
      {loaded && (
        <div className="grid gap-5">
          <div className={cl("pt-5", styles.initialGrid, styles.articleGrid)}>
            {initialData.map((article, idx) => (
              <ArticleCard
                key={article._id + idx}
                group="initial"
                {...article}
              />
            ))}
            {data.map((article, idx) => (
              <ArticleCard
                key={idx}
                group="lazy"
                delay={((idx % 3) + 1) * 300}
                {...article}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleGrid;
