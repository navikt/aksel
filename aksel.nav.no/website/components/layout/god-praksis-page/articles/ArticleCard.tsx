import cl from "clsx";
import Link from "next/link";
import { CSSProperties } from "react";
import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { GpArticleListT } from "@/layout/god-praksis-page/types";
import styles from "./articles.module.css";

const trunc = (text, num_chars) => {
  return `${text.substring(0, num_chars)}${
    text.length > num_chars ? "..." : ""
  }`;
};

export const ArticleCard = ({
  heading,
  ingress,
  slug,
  publishedAt,
  group,
  delay,
}: GpArticleListT["articles"][number] & {
  group: "initial" | "lazy";
  delay?: number;
}) => {
  const date = useFormatedDate(publishedAt);

  const tDelay: CSSProperties = delay
    ? { transitionDuration: `${delay}ms` }
    : undefined;

  return (
    <Link
      href={`/${slug}`}
      className={cl(
        "flex-shrink w-full overflow-hidden text-ellipsis hover:shadow-large p-10 rounded-xlarge bg-surface-default shadow-small",
        {
          [styles.articleGrid]: group === "initial",
          [styles.articleGridLazy]: group === "lazy",
        }
      )}
      style={tDelay}
    >
      <VStack justify="space-between" className="min-h-full relative">
        <div>
          <Heading
            size="medium"
            level="2"
            spacing
            className="text-aksel-heading underline"
          >
            {heading}
          </Heading>
          {ingress && <BodyLong>{trunc(ingress, 100)}</BodyLong>}
        </div>

        {date && <div className="pt-2">{date}</div>}
      </VStack>
    </Link>
  );
};
