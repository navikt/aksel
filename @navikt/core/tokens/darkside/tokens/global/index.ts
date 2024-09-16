import { ColorThemeMode, GlobalColorRoles, globalColorRoles } from "../util";
import AccentScale from "./accent";
import NeutralScale from "./neutral";

export const getGlobalColorScale = (
  role: GlobalColorRoles,
  mode: ColorThemeMode,
) => {
  const mapping = {
    accent: AccentScale,
    neutral: NeutralScale,
  };

  return mapping[role](mode);
};

export const completeGlobalLightScale = () => {
  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...getGlobalColorScale(role, "light") };
  }, {});
};

export const completeGlobalDarkScale = () => {
  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...getGlobalColorScale(role, "dark") };
  }, {});
};
