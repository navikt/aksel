import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";

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
    {icon && <LinkCardIcon data-color="brand-blue">{icon}</LinkCardIcon>}
  </LinkCard>
);

export default GettingStartedCard;
