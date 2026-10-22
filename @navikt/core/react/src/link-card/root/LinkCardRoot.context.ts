import { createStrictContext } from "../../utils/helpers";
import type { LinkCardProps } from "./LinkCardRoot";

type LinkCardContextProps = {
  size: LinkCardProps["size"];
};

const { Provider: LinkCardContextProvider, useContext: useLinkCardContext } =
  createStrictContext<LinkCardContextProps>({
    name: "LinkCardContextProvider",
  });

export { LinkCardContextProvider, useLinkCardContext };
export type { LinkCardContextProps };
