function sortHeadings(a: string, b: string): number {
  const regex = /(\d+|\D+)/g;
  const aParts = a.match(regex) || [];
  const bParts = b.match(regex) || [];

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || "";
    const bPart = bParts[i] || "";

    const aIsNumber = !Number.isNaN(Number(aPart));
    const bIsNumber = !Number.isNaN(Number(bPart));

    if (aIsNumber && bIsNumber) {
      const diff = Number(aPart) - Number(bPart);
      if (diff !== 0) {
        return diff;
      }
    } else if (aIsNumber) {
      return -1;
    } else if (bIsNumber) {
      return 1;
    } else {
      const diff = aPart.localeCompare(bPart);
      if (diff !== 0) {
        return diff;
      }
    }
  }

  return 0;
}

export { sortHeadings };
