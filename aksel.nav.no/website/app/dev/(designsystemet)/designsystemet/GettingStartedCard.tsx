import {
  LinkCard,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const GettingStartedCard = ({ title, description, icon }: Props) => (
  <LinkCard hasArrow={false}>
    <LinkCardTitle as="h2">{title}</LinkCardTitle>
    <LinkCardDescription>{description}</LinkCardDescription>
    <LinkCardIcon>{icon}</LinkCardIcon>
  </LinkCard>
);

export default GettingStartedCard;
