import cl from "clsx";
import Link from "next/link";
import { CSSProperties } from "react";
import {
  ChevronRightIcon,
  FileFillIcon,
  TagFillIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Detail, Heading, VStack } from "@navikt/ds-react";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { GpArticleT } from "@/layout/god-praksis-page/types";
import styles from "./articles.module.css";

const trunc = (text, num_chars) => {
  return `${text.substring(0, num_chars)}${
    text.length > num_chars ? "..." : ""
  }`;
};

/**
 * TODO:
 * - Implement reference-design from Figma (WIP)
 * - Implement better screen-reader ux
 * - - Only Heading should be a Link(<a>) with ::after for click-area
 * - - (see `components/sanity-modules/cards/ArtikkelCard.tsx`)
 */
export const ArticleCard = ({
  heading,
  ingress,
  slug,
  publishedAt,
  group,
  delay,
  innholdstype,
  currentUndertema,
}: GpArticleT & {
  group: "initial" | "lazy";
  delay?: number;
}) => {
  /**
   * TODO: This might be better resolved server-side in `initialProps`
   */
  const date = useFormatedDate(publishedAt);

  const tDelay: CSSProperties = delay
    ? { transitionDuration: `${delay}ms` }
    : undefined;

  return (
    <Link
      href={`/${slug}`}
      className={cl(
        "flex-shrink w-full focus:outline-none focus-visible:shadow-focus overflow-hidden text-ellipsis hover:shadow-large p-5 rounded-large bg-surface-default shadow-small",
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
            size="small"
            level="2"
            className="text-aksel-heading underline"
          >
            {heading}
          </Heading>
          {/* TODO: Can do this serverside in initialProps (saves data sent to user) */}
          {date && (
            <Detail textColor="subtle" className="mt-1">
              {date}
            </Detail>
          )}

          {ingress && (
            <BodyLong className="mt-2">{trunc(ingress, 100)}</BodyLong>
          )}
        </div>
        <div className="flex gap-2 justify-between items-center mt-6">
          <div className="flex gap-3 flex-wrap items-center font-semibold">
            {currentUndertema && (
              <span className="text-deepblue-500 flex gap-05 items-center">
                <TagFillIcon aria-hidden />
                <span>{currentUndertema}</span>
              </span>
            )}
            <span className="text-teal-700 flex gap-05 items-center">
              <FileFillIcon aria-hidden />
              <span>{innholdstype}</span>
            </span>
          </div>
          <ChevronRightIcon aria-hidden className="flex-shrink-0" />
        </div>
      </VStack>
    </Link>
  );
};
