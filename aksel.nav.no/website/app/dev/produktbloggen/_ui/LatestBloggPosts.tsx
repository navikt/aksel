import { Heading, Show, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import styles from "../_ui/Produktbloggen.module.css";
import { HighlightedBlogg } from "./HighlightedBlogg";

export const LatestBloggposts = ({
  bloggs,
  title,
  intro,
}: {
  bloggs: any;
  title: string;
  intro: any[] | null;
}) => {
  if (!bloggs || bloggs.length < 3) {
    return null;
  }

  return (
    <>
      <VStack align="center">
        <Heading
          level="1"
          size="xlarge"
          spacing
          className={styles.overviewTitle}
        >
          {title}
        </Heading>
        {intro && (
          <CustomPortableText
            value={intro}
            className={styles.overviewSubtitle}
          />
        )}
      </VStack>
      {/* Desktop-view */}
      <div className={styles.latestBloggPosts}>
        <HighlightedBlogg blogg={bloggs[0]} />
        <Show above="md">
          <HighlightedBlogg blogg={bloggs[1]} />
        </Show>
      </div>
    </>
  );
};
