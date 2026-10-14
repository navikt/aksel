const getOptionId = (prefix: string, id: string) =>
  `${prefix}-${id.replace(/ /g, "_")}`;

export { getOptionId };
