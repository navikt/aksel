const getOptionId = (prefix: string, id: string) =>
  `${prefix}-${encodeURIComponent(id)}`;

export { getOptionId };
