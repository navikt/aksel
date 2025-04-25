import {
  List as AkselList,
  ListItem as AkselListItem,
  ListProps as AkselListProps,
} from "@navikt/ds-react/List";
import styles from "./Typography.module.css";

type ListProps = Pick<AkselListProps, "as" | "children"> &
  React.HTMLAttributes<HTMLDivElement>;

function WebsiteList({ children, as = "ul", ...restProps }: ListProps) {
  return (
    <AkselList {...restProps} className={styles.typoList} as={as}>
      {children}
    </AkselList>
  );
}

type ListItemProps = {
  children: React.ReactNode;
  icon?: boolean;
};

function WebsiteListItem({ children, icon = false }: ListItemProps) {
  return (
    <AkselListItem
      icon={
        icon ? (
          <svg
            width="12"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className={styles.typoListIcon}
          >
            <rect width="24" height="24" rx="6" />
          </svg>
        ) : undefined
      }
    >
      {children}
    </AkselListItem>
  );
}

export { WebsiteList, WebsiteListItem };
