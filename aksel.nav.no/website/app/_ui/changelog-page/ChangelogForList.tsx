import { FileIcon } from "@navikt/aksel-icons";
import { InfoCard, List } from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { ListItem } from "@navikt/ds-react/List";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";

type ChangelogForListProps = {
  changelogFor: {
    heading: string | null;
    slug: string | null;
  }[];
};

function ChangelogForList({ changelogFor }: ChangelogForListProps) {
  if (changelogFor.length === 0) {
    return null;
  }

  return (
    <InfoCard
      data-color="brand-blue"
      data-block-margin="space-28"
      data-text-prose
    >
      <InfoCardHeader icon={<FileIcon aria-hidden />}>
        <InfoCardTitle>{`${changelogFor.length > 1 ? "Sider" : "Side"} som er endret`}</InfoCardTitle>
      </InfoCardHeader>
      <InfoCardContent>
        <List>
          {changelogFor.map((artikkel) => (
            <ListItem key={artikkel.slug}>
              <UmamiLink
                href={`/${artikkel.slug ?? ""}`}
                lenkegruppe="endringslogg-backlink"
                nativeLink
              >
                {artikkel.heading}
              </UmamiLink>
            </ListItem>
          ))}
        </List>
      </InfoCardContent>
    </InfoCard>
  );
}

export { ChangelogForList };
