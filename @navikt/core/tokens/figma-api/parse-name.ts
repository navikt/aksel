const parseName = (name: string) => {
  const [scope, ...rest] = name.toLowerCase().split("/");
  return `navds-${scope}-color-${rest.join("-")}`;
};

export default parseName;
