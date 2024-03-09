import { VStack } from "@navikt/ds-react";
import { GpChipRow } from "@/layout/god-praksis-page/chips/GpChipRow";
import { getArticleCounts } from "@/layout/god-praksis-page/count-articles";
import { ParsedGPArticle } from "@/layout/god-praksis-page/interface";
import { useGpViews } from "@/layout/god-praksis-page/useGpViews";

type GpChipNavigationProps = {
  articles: ParsedGPArticle[];
};

export function GpChipNavigation({ articles }: GpChipNavigationProps) {
  const view = useGpViews();

  const articleCount = getArticleCounts(
    articles,
    view.undertema,
    view.innholdstype,
  );

  return (
    <VStack gap="4">
      <GpChipRow
        type="undertema"
        entries={Object.entries(articleCount.undertemaCounts)}
      />
      <GpChipRow
        type="innholdstype"
        entries={Object.entries(articleCount.innholdstypeCounts)}
      />
    </VStack>
  );
}
