import { expect, test } from "vitest";
import { findUserByEmail } from "../find-user";

test("findUserByEmail returns user when user with given email exists", () => {
  const members = [
    { id: "test_id", email: "test1@example.com" },
    { id: "test_id", email: "test2@example.com" },
    { id: "test_id", email: "test3@example.com" },
  ];

  const result = findUserByEmail("test2@example.com", members);
  expect(result).toEqual(members[1]);
});

test("findUserByEmail returns undefined when user with given email does not exist", () => {
  const members = [
    { id: "test_id", email: "test1@example.com" },
    { id: "test_id", email: "test2@example.com" },
    { id: "test_id", email: "test3@example.com" },
  ];

  const result = findUserByEmail("nonexistent@example.com", members);
  expect(result).toBeUndefined();
});

test("findUserByEmail returns undefined member contains no email-key", () => {
  const members = [{}, {}, {}];

  const result = findUserByEmail("nonexistent@example.com", members);
  expect(result).toBeUndefined();
});

test("findUserByEmail is case insensitive", () => {
  const members = [
    { id: "test_id", email: "test1@example.com" },
    { id: "test_id", email: "test2@example.com" },
    { id: "test_id", email: "test3@example.com" },
  ];

  const result = findUserByEmail("TEST2@EXAMPLE.COM", members);
  expect(result).toEqual(members[1]);
});
