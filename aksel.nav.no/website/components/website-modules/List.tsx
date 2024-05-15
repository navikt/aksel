import {
  List as AkselList,
  ListProps as AkselListProps,
} from "@navikt/ds-react";

type ListProps = Pick<AkselListProps, "as" | "title"> & {
  children: React.ReactNode;
};

const List = ({ children, as = "ul", title }: ListProps) => (
  <AkselList className="list-margin max-w-text" as={as} title={title}>
    {children}
  </AkselList>
);

type ListItemProps = {
  children: React.ReactNode;
  icon?: boolean;
};

const ListItem = ({ children, icon = false }: ListItemProps) => (
  <AkselList.Item
    className="list-margin max-w-text"
    icon={
      icon ? (
        <svg
          width="12"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-45"
          aria-hidden
        >
          <rect width="24" height="24" rx="6" className="fill-deepblue-500" />
        </svg>
      ) : undefined
    }
  >
    {children}
  </AkselList.Item>
);

export { List, ListItem };
