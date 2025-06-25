import { BoxNew, LinkCard } from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import "./GettingStartedCard.css";

type GettingStartedItem = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_getting_started"]
>[number];

type Props = {
  title: GettingStartedItem["title"];
  description: GettingStartedItem["description"];
  icon: React.ReactNode;
  link: GettingStartedItem["link"];
};

const GettingStartedCard = ({ title, description, icon, link }: Props) => (
  <LinkCard>
    {title && (
      <LinkCardTitle as="h2">
        {link ? <LinkCardAnchor href={link}>{title}</LinkCardAnchor> : title}
      </LinkCardTitle>
    )}
    {description && <LinkCardDescription>{description}</LinkCardDescription>}
    {icon && (
      <BoxNew
        asChild
        padding="space-8"
        borderRadius="12"
        background="neutral-moderateA"
      >
        <LinkCardIcon
          className="aksel__getting-started__icon"
          data-color="brand-blue"
        >
          {icon}
        </LinkCardIcon>
      </BoxNew>
    )}
  </LinkCard>
);

export default GettingStartedCard;
