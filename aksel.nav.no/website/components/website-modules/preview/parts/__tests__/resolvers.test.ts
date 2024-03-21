import { describe, expect, test } from "vitest";
import { runResolvers } from "../resolvers";

describe("runResolvers", () => {
  test("should return original data when resolvers is null", () => {
    const data = { key: "value" };
    expect(runResolvers({ resolvers: null, data })).toEqual(data);
  });

  test("should return original data when resolvers is an empty array", () => {
    const data = { key: "value" };
    expect(runResolvers({ resolvers: [], data })).toEqual(data);
  });

  test("should run resolver callback with data from specified keys", () => {
    const data = { key1: "value1", key2: "value2" };
    const resolvers = [
      {
        key: "result",
        dataKeys: ["key1", "key2"],
        cb: (value) => value[0] + value[1],
      },
    ];
    expect(runResolvers({ resolvers, data })).toEqual({
      ...data,
      result: "value1value2",
    });
  });

  test("should run multiple resolver callbacks", () => {
    const data = { key1: "value1", key2: "value2" };
    const resolvers = [
      {
        key: "result1",
        dataKeys: ["key1"],
        cb: (value) => value[0] + "suffix",
      },
      {
        key: "result2",
        dataKeys: ["key2"],
        cb: (value) => "prefix" + value[0],
      },
    ];
    expect(runResolvers({ resolvers, data })).toEqual({
      ...data,
      result1: "value1suffix",
      result2: "prefixvalue2",
    });
  });

  test("should handle nested keys", () => {
    const data = { key1: { key2: "value2" } };
    const resolvers = [
      {
        key: "result",
        dataKeys: ["key1.key2"],
        cb: (value) => "prefix" + value[0],
      },
    ];
    expect(runResolvers({ resolvers, data })).toEqual({
      ...data,
      result: "prefixvalue2",
    });
  });
});
