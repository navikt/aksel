import { CodeIcon, PaletteIcon } from "@navikt/aksel-icons";
import { HGrid } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import GettingStartedCard from "./GettingStartedCard";

type GettingStartedItem = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_getting_started"]
>[number];

type Props = {
  cards?: {
    title: GettingStartedItem["title"];
    description: GettingStartedItem["description"];
    icon: GettingStartedItem["icon"];
    link: GettingStartedItem["link"];
  }[];
};

const GettingStartedSection = ({ cards }: Props) => (
  <HGrid gap="space-24" width="100%" columns={{ xs: 1, md: 2 }}>
    {cards?.map(({ title, description, icon: iconType, link }) => {
      const icon =
        iconType === "Palette" ? (
          <PaletteIcon fontSize="48" />
        ) : iconType === "Code" ? (
          <CodeIcon fontSize="48" />
        ) : undefined;
      return (
        <GettingStartedCard
          key={title}
          title={title}
          description={description}
          icon={icon}
          link={link}
        />
      );
    })}
  </HGrid>
);

export default GettingStartedSection;
