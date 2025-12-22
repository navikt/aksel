import { AkselColor } from "../../../types";
import { createStrictContext } from "../../../util/create-context";

type BaseAlertContextProps = {
  size: "medium" | "small";
  status?: "announcement" | "success" | "warning" | "error";
  color: AkselColor | undefined;
  statusId?: string;
};

const [BaseAlertProvider, useBaseAlert] =
  createStrictContext<BaseAlertContextProps>({
    name: "BaseAlert",
  });

export { BaseAlertProvider, useBaseAlert };
export type { BaseAlertContextProps };
