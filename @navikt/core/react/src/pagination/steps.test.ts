import faker from "faker";
import { getSteps } from "./Pagination";

describe("getSteps", () => {
  it("lists all pages when count is <= 7", () => {
    const count = faker.datatype.number({ min: 1, max: 7 });
    expect(getSteps({ page: 1, count })).toEqual(
      Array.from({ length: count }, (_, i) => i + 1)
    );
  });

  it("has an end ellipsis when count >= 8", () => {
    const count = faker.datatype.number({ min: 8 });
    const page = faker.datatype.number({ min: 1, max: 4 });
    expect(
      getSteps({
        page,
        count,
      })
    ).toEqual([1, 2, 3, 4, 5, "ellipsis", count]);
  });

  it("has a start ellipsis when count - page >= 3", () => {
    const count = faker.datatype.number({ min: 8 });
    const page = faker.datatype.number({ min: count - 3, max: count });
    expect(
      getSteps({
        page,
        count,
      })
    ).toEqual([
      1,
      "ellipsis",
      count - 4,
      count - 3,
      count - 2,
      count - 1,
      count,
    ]);
  });

  it("has start & end ellipsis when count is high", () => {
    const count = faker.datatype.number({ min: 9 });
    const page = faker.datatype.number({ min: 5, max: count - 4 });
    expect(
      getSteps({
        page,
        count,
      })
    ).toEqual([1, "ellipsis", page - 1, page, page + 1, "ellipsis", count]);
  });

  it("can have a reduced siblingCount", () => {
    const count = faker.datatype.number({ min: 7 });
    const page = faker.datatype.number({ min: 4, max: count - 3 });
    expect(
      getSteps({
        page,
        count,
        siblingCount: 0,
      })
    ).toEqual([1, "ellipsis", page, "ellipsis", count]);
  });

  it("can have an increased siblingCount", () => {
    const count = faker.datatype.number({ min: 11 });
    const page = faker.datatype.number({ min: 6, max: count - 5 });
    expect(
      getSteps({
        page,
        count,
        siblingCount: 2,
      })
    ).toEqual([
      1,
      "ellipsis",
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      "ellipsis",
      count,
    ]);
  });

  it("can have an reduced boundaryCount", () => {
    const count = faker.datatype.number({ min: 7 });
    const page = faker.datatype.number({ min: 4, max: count - 3 });
    expect(
      getSteps({
        page,
        count,
        boundaryCount: 0,
      })
    ).toEqual(["ellipsis", page - 1, page, page + 1, "ellipsis"]);
  });

  it("can have an increased boundaryCount", () => {
    const count = faker.datatype.number({ min: 11 });
    const page = faker.datatype.number({ min: 6, max: count - 5 });
    expect(
      getSteps({
        page,
        count,
        boundaryCount: 2,
      })
    ).toEqual([
      1,
      2,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      count - 1,
      count,
    ]);
  });
});
