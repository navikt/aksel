import { createContext } from "react";
import { ListProps } from "./types";

interface ListContextProps {
  listType: Exclude<ListProps["as"], undefined>;
  size: Exclude<ListProps["size"], undefined>;
}

export const ListContext = createContext<ListContextProps>({
  listType: "ul",
  size: "medium",
});
