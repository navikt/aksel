import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

const GettingStartedCard = ({ title, description, icon, link }: Props) => (
  <LinkCard>
    <LinkCardTitle as="h2">
      <LinkCardAnchor href={link}>{title}</LinkCardAnchor>
    </LinkCardTitle>
    <LinkCardDescription>{description}</LinkCardDescription>
    <LinkCardIcon data-color="brand-blue">{icon}</LinkCardIcon>
  </LinkCard>
);

export default GettingStartedCard;
