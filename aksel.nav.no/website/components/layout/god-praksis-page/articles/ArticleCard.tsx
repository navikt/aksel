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
import { GpArticleT } from "@/layout/god-praksis-page/interface";
import styles from "./articles.module.css";

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
  const date = useFormatedDate(publishedAt);

  const tDelay: CSSProperties = delay
    ? { transitionDuration: `${delay}ms` }
    : undefined;

  return (
    <Link
      href={`/${
        slug.replace("god-praksis/", "gp/") /* TODO: Remove replace */
      }`}
      className={cl(
        "w-full flex-shrink overflow-hidden text-ellipsis rounded-large bg-surface-default p-5 shadow-small transition-shadow ease-out hover:shadow-large focus:outline-none focus-visible:shadow-focus",
        {
          [styles.animatedFade]: group === "initial",
          [styles.animatedFadeLazy]: group === "lazy",
        },
      )}
      style={tDelay}
    >
      <VStack justify="space-between" className="relative min-h-full">
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
            <BodyLong className={cl("mt-2 line-clamp-2", styles.lineClamp)}>
              {ingress}
            </BodyLong>
          )}
        </div>
        <div className="mt-6 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 font-semibold">
            {currentUndertema && (
              <span className="flex items-center gap-05 text-teal-700">
                <TagFillIcon aria-hidden />
                <span>{currentUndertema}</span>
              </span>
            )}
            <span className="flex items-center gap-05 text-violet-600">
              <FileFillIcon aria-hidden />
              <span>{innholdstype}</span>
            </span>
          </div>
          <ChevronRightIcon aria-hidden className="flex-shrink-0 text-2xl" />
        </div>
      </VStack>
    </Link>
  );
};
