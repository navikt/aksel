import unifyNestedLevel from "./unify-nested-level";

const deepen = (obj: { [key: string]: { value: string } }) => {
  const result = {};

  const workObj = unifyNestedLevel(obj);

  // For each object path (property key) in the object
  for (const objectPath in workObj) {
    // Split path into component parts
    const parts = objectPath.split("-");

    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      target = target[part] = target[part] || {};
    }
    // Set value at end of path
    target[parts[0]] = workObj[objectPath];
  }

  return result;
};

export default deepen;
