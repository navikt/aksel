const unifyNestedLevel = (obj: { [key: string]: { value: string } }) => {
  // deep copy
  const workObj = JSON.parse(JSON.stringify(obj));

  Object.keys(workObj).forEach((k) => {
    const deeperKeys = Object.keys(workObj).filter(
      (k2) => k2.startsWith(`${k}-`) && k2.length > k.length
    );
    if (deeperKeys.length > 0) {
      const neededNestedLevel =
        Math.max(...deeperKeys.map((k) => k.split("-").length)) -
        k.split("-").length;

      delete Object.assign(workObj, {
        [k + "-@".repeat(neededNestedLevel)]: workObj[k],
      })[k];
    }
  });
  return workObj;
};

export default unifyNestedLevel;
