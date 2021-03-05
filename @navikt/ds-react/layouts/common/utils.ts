export const whiteDecoratorUtils = (toggle: boolean) => {
  const decUtilsContainer = document
    .getElementsByClassName(`decorator-utils-container`)
    .item(0);

  if (toggle) {
    decUtilsContainer?.classList?.add("navds-layout__decorator--white");
  } else {
    decUtilsContainer?.classList?.remove("navds-layout__decorator--white");
  }
};
