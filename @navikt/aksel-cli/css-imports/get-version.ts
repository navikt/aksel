import axios from "axios";

export const getAllVersions = async () => {
  try {
    const npmPackageData = await axios.get(
      `https://registry.npmjs.org/@navikt/ds-css`
    );
    return Object.keys(npmPackageData.data["versions"]);
  } catch (e) {
    console.log(e);
    return [];
  }
};
