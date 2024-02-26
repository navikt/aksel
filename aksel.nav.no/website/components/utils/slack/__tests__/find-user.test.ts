import { expect, test, vi } from "vitest";
import { findUserByEmail } from "../find-user";

vi.mock("server-only", () => {
  return {
    // mock server-only module
  };
});

test("findUserByEmail returns user when user with given email exists", () => {
  const members = [
    { profile: { email: "test1@example.com" } },
    { profile: { email: "test2@example.com" } },
    { profile: { email: "test3@example.com" } },
  ];

  const result = findUserByEmail("test2@example.com", members);
  expect(result).toEqual(members[1]);
});

test("findUserByEmail returns undefined when user with given email does not exist", () => {
  const members = [
    { profile: { email: "test1@example.com" } },
    { profile: { email: "test2@example.com" } },
    { profile: { email: "test3@example.com" } },
  ];

  const result = findUserByEmail("nonexistent@example.com", members);
  expect(result).toBeUndefined();
});

test("findUserByEmail returns undefined member contains no email-key", () => {
  const members = [{ profile: {} }, { profile: {} }, { profile: {} }];

  const result = findUserByEmail("nonexistent@example.com", members);
  expect(result).toBeUndefined();
});

test("findUserByEmail is case insensitive", () => {
  const members = [
    { profile: { email: "test1@example.com" } },
    { profile: { email: "test2@example.com" } },
    { profile: { email: "test3@example.com" } },
  ];

  const result = findUserByEmail("TEST2@EXAMPLE.COM", members);
  expect(result).toEqual(members[1]);
});
