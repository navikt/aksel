type PaginationStepsOptions = {
  page: number;
  count: number;
  boundaryCount?: number;
  siblingCount?: number;
};

const getSteps = ({
  page,
  count,
  boundaryCount = 1,
  siblingCount = 1,
}: PaginationStepsOptions) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (count <= (boundaryCount + siblingCount) * 2 + 3) return range(1, count);

  const startPages = range(1, boundaryCount);
  const endPages = range(count - boundaryCount + 1, count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = siblingsStart + siblingCount * 2;

  return [
    ...startPages,
    siblingsStart - (startPages[startPages.length - 1] ?? 0) === 2
      ? siblingsStart - 1
      : "ellipsis",
    ...range(siblingsStart, siblingsEnd),
    (endPages[0] ?? count + 1) - siblingsEnd === 2
      ? siblingsEnd + 1
      : "ellipsis",
    ...endPages,
  ];
};

export { getSteps };
