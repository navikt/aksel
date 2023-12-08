import cl from "clsx";
import { HGrid, Heading } from "@navikt/ds-react";
import { GpArticleListT } from "@/layout/god-praksis-page/types";
import { ArticleCard } from "./ArticleCard";
import styles from "./articles.module.css";

type ArticleGridT = {
  name: string;
  initialData: GpArticleListT["articles"];
  data: GpArticleListT["articles"];
};

function ArticleGrid({ name, data, initialData }: ArticleGridT) {
  if (!initialData) {
    /* TODO: Emptystate? */
    return null;
  }
  return (
    <div>
      <Heading level="2" size="medium" className="text-aksel-heading">
        {name}
      </Heading>

      <HGrid
        gap="6"
        columns={{ xs: 1, md: 2, lg: 3 }}
        className={cl("pt-5", styles.articleGrid)}
      >
        {initialData.map((article) => (
          <ArticleCard key={article._id} group="initial" {...article} />
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
    </div>
  );
}

export default ArticleGrid;
