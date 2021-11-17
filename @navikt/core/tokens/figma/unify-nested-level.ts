const unifyNestedLevel = (obj: { [key: string]: { value: string } }) => {
  Object.keys(obj).forEach((k) => {
    const deeperKeys = Object.keys(obj).filter(
      (k2) => k2.startsWith(`${k}-`) && k2.length > k.length
    );
    if (deeperKeys.length > 0) {
      const neededNestedLevel =
        Math.max(...deeperKeys.map((k) => k.split("-").length)) -
        k.split("-").length;

      delete Object.assign(obj, {
        [k + "-@".repeat(neededNestedLevel)]: obj[k],
      })[k];
    }
  });
};

export default unifyNestedLevel;
