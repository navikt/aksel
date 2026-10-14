const getOptionId = (prefix: string, id: string) =>
  `${prefix}-${id.replace(/\s/g, "_")}`;

export { getOptionId };
