import { AkselColor } from "../../../types";
import { createContext } from "../../../util/create-context";

type BaseAlertContextProps = {
  size: "medium" | "small";
  statusType: "alert" | "message";
  variant?: "announcement" | "success" | "warning" | "error";
  color: AkselColor | undefined;
};

const [BaseAlertProvider, useBaseAlert] = createContext<BaseAlertContextProps>({
  name: "BaseAlert",
  errorMessage: "useBaseAlert must be used within a BaseAlertProvider",
});

export { BaseAlertProvider, useBaseAlert };
export type { BaseAlertContextProps };
