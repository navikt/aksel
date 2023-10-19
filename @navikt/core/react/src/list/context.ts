import { createContext } from "react";
import { ListProps } from "./types";

interface ListContextProps {
  listType: ListProps["as"];
  isNested: boolean | null;
  size: ListProps["size"];
}

export const ListContext = createContext<ListContextProps>({
  listType: "ul",
  isNested: null,
  size: "medium",
});
