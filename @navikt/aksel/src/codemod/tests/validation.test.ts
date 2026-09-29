import type { Command } from "commander";
import isGitClean from "is-git-clean";
import { afterEach, describe, expect, test, vi } from "vitest";
import { validateGit } from "../validation";

vi.mock("is-git-clean", () => ({ default: { sync: vi.fn() } }));

const gitSync = vi.mocked(isGitClean.sync);

function createProgram() {
  const error = vi.fn((message: string) => {
    throw new Error(message);
  });
  return { program: { error } as unknown as Command, error };
}

function gitError(props: Record<string, unknown>) {
  return Object.assign(new Error("Command failed: git status"), props);
}

describe("validateGit", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("passes when the working tree is clean", () => {
    gitSync.mockReturnValue(true);
    const { program, error } = createProgram();

    validateGit({}, program);

    expect(error).not.toHaveBeenCalled();
  });

  test("fails when the working tree has changes", () => {
    gitSync.mockReturnValue(false);
    const { program, error } = createProgram();

    expect(() => validateGit({}, program)).toThrow(/stash or commit/);
    expect(error).toHaveBeenCalledTimes(1);
  });

  test.each([
    "fatal: not a git repository (or any of the parent directories): .git\n",
    "fatal: Not a git repository (or any of the parent directories): .git\n",
  ])("passes outside a git repository (%j)", (stderr) => {
    gitSync.mockImplementation(() => {
      throw gitError({ status: 128, stderr });
    });
    const { program, error } = createProgram();

    validateGit({}, program);

    expect(error).not.toHaveBeenCalled();
  });

  test("reports a missing git binary instead of asking to stash", () => {
    gitSync.mockImplementation(() => {
      throw gitError({ code: "ENOENT" });
    });
    const { program, error } = createProgram();

    expect(() => validateGit({}, program)).toThrow(/git/i);
    expect(error.mock.calls[0][0]).not.toMatch(/stash or commit/);
    expect(error.mock.calls[0][0]).toMatch(/--force/);
  });

  test("fails on other git errors", () => {
    gitSync.mockImplementation(() => {
      throw gitError({
        status: 128,
        stderr: "fatal: detected dubious ownership",
      });
    });
    const { program } = createProgram();

    expect(() => validateGit({}, program)).toThrow(/stash or commit/);
  });

  test.each([{ dryRun: true }, { force: true }])(
    "skips the check with force",
    (options) => {
      const { program, error } = createProgram();

      validateGit(options, program);

      expect(gitSync).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    },
  );
});
