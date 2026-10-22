import { createContext } from "react";
import type { ListProps } from "../List.types";

interface ListContextProps {
  listType: Exclude<ListProps["as"], undefined>;
  size: Exclude<ListProps["size"], undefined>;
}

const ListContext = createContext<ListContextProps>({
  listType: "ul",
  size: "medium",
});

export { ListContext };
