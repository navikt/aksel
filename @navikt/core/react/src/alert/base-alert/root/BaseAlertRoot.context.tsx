import { AkselColor } from "../../../types";
import { createStrictContext } from "../../../util/create-strict-context";

type BaseAlertContextProps = {
  size: "medium" | "small";
  status?: "announcement" | "success" | "warning" | "error";
  color: AkselColor | undefined;
  statusId?: string;
};

const { Provider: BaseAlertProvider, useContext: useBaseAlert } =
  createStrictContext<BaseAlertContextProps>({
    name: "BaseAlert",
  });

export { BaseAlertProvider, useBaseAlert };
export type { BaseAlertContextProps };
