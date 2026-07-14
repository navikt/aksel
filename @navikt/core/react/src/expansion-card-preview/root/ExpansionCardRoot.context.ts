import { createStrictContext } from "../../utils/helpers";

export type ExpansionCardContextProps = {
  size: "medium" | "small";
};

const { Provider: ExpansionCardProvider, useContext: useExpansionCardContext } =
  createStrictContext<ExpansionCardContextProps>({
    name: "ExpansionCardContext",
    errorMessage:
      "ExpansionCard sub-components cannot be rendered outside the ExpansionCard component.",
  });

export { ExpansionCardProvider, useExpansionCardContext };
