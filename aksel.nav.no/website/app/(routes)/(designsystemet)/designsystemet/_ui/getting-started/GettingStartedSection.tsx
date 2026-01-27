import { CodeIcon, PaletteIcon } from "@navikt/aksel-icons";
import { Box, HGrid, LinkCard } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { DS_FRONT_PAGE_QUERY_RESULT } from "@/app/_sanity/query-types";

type GettingStartedSectionProps = {
  cards: NonNullable<DS_FRONT_PAGE_QUERY_RESULT>["ds_getting_started"];
};

function GettingStartedSection({ cards }: GettingStartedSectionProps) {
  return (
    <HGrid gap="space-24" width="100%" columns={{ xs: 1, md: 2 }}>
      {cards?.map(({ title, description, icon: iconType, link }) => {
        if (!title || !link || !iconType || !description) {
          return null;
        }

        const Icon = iconType === "Palette" ? PaletteIcon : CodeIcon;

        return (
          <LinkCard key={title}>
            <LinkCardTitle as="h2">
              <LinkCardAnchor href={link}>{title}</LinkCardAnchor>
            </LinkCardTitle>
            <LinkCardDescription>{description}</LinkCardDescription>
            <Box
              asChild
              padding="space-8"
              borderRadius="12"
              background="brand-blue-moderateA"
            >
              <LinkCardIcon
                className="aksel__getting-started__icon"
                data-color="brand-blue"
              >
                <Icon fontSize="48" color="var(--ax-text-subtle)" />
              </LinkCardIcon>
            </Box>
          </LinkCard>
        );
      })}
    </HGrid>
  );
}

export { GettingStartedSection };
