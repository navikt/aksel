"use client";

import { PortableTextBlock } from "next-sanity";
import { useRef } from "react";
import { TestFlaskIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import ShowMore from "../../../grunnleggende/endringslogg/_ui/ShowMore";

export const PreviewNote = ({ content }: { content: PortableTextBlock[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <InfoCard
      ref={ref}
      data-block-margin="space-28"
      data-color="meta-purple"
      style={{
        position: "relative",
        scrollMarginTop: "var(--website-header-sticky-height)",
      }}
    >
      <InfoCardHeader icon={<TestFlaskIcon aria-hidden />}>
        <InfoCardTitle>Preview</InfoCardTitle>
      </InfoCardHeader>
      <InfoCardContent>
        <ShowMore as="div" scrollTargetRef={ref}>
          <ShowMore.Content collapsedHeight="16rem">
            <CustomPortableText value={content} />
          </ShowMore.Content>
          <ShowMore.Button>
            <Button
              size="small"
              variant="secondary"
              data-color="neutral"
              style={{ bottom: "var(--ax-space-20)" }}
            />
          </ShowMore.Button>
        </ShowMore>
      </InfoCardContent>
    </InfoCard>
  );
};
