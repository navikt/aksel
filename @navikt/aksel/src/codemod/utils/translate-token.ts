import _ from "lodash";

export const translateToken = (token: string, type: "scss" | "less" | "js") => {
  switch (type) {
    case "scss":
      return token.replace("--", "$");
    case "less":
      return token.replace("--", "@");
    case "js":
      return _.startCase(token).split(" ").join("");

    default:
      return token;
  }
};
