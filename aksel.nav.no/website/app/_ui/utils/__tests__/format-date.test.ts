import { describe, expect, test } from "vitest";
import { formatDateString } from "../format-date";

describe("Format date utilities", () => {
  test("formatDateString should update date to corrent format", () => {
    const date = "2022-06-09T11:05:48Z";
    const date2 = "2021-03-02T12:05:48Z";

    expect(formatDateString(date)).toEqual("9. juni 2022");
    expect(formatDateString(date2)).toEqual("2. mars 2021");
  });
});
