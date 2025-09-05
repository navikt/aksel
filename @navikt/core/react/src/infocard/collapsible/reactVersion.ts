import React from "react";

const majorVersion = parseInt(React.version, 10);

type SupportedVersions = 17 | 18 | 19;

function isReactVersionAtLeast(
  reactVersionToCheck: SupportedVersions,
): boolean {
  return majorVersion >= reactVersionToCheck;
}

export { isReactVersionAtLeast };
