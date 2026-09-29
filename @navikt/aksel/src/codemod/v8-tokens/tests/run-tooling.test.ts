import type { Command } from "commander";
import Enquirer from "enquirer";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { validateGit } from "../../validation";
import { TokenStatus } from "../config/TokenStatus";
import { runTooling } from "../run-tooling";

vi.mock("enquirer", () => ({ default: { prompt: vi.fn() } }));
vi.mock("fast-glob", () => ({ default: vi.fn(async () => []) }));
vi.mock("jscodeshift/src/Runner", () => ({
  run: vi.fn(async () => ({ error: 0, ok: 0, nochange: 0, skip: 0 })),
}));
vi.mock("../../validation", () => ({ validateGit: vi.fn() }));
vi.mock("../tasks/status", () => ({
  getStatus: vi.fn(() => new TokenStatus()),
}));
vi.mock("../tasks/print-remaining", () => ({ printRemaining: vi.fn() }));

const prompt = vi.mocked(Enquirer.prompt);
const program = { error: vi.fn() } as unknown as Command;
const baseOptions = { force: false, dryRun: false, glob: "**/*.css", ext: "" };

function selectTasks(...tasks: string[]) {
  for (const task of [...tasks, "exit"]) {
    prompt.mockResolvedValueOnce({ task });
  }
}

describe("runTooling", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("returns instead of exiting the process when the user exits", async () => {
    selectTasks();

    await expect(runTooling(baseOptions, program)).resolves.toBeUndefined();
    expect(process.exit).not.toHaveBeenCalled();
  });

  test("checks git once, even when several migrations run in a row", async () => {
    selectTasks("css-tokens", "scss-tokens", "run-all-migrations");

    await runTooling(baseOptions, program);

    expect(validateGit).toHaveBeenCalledTimes(1);
    expect(program.error).not.toHaveBeenCalled();
  });

  test("skips the git check when the caller already did it", async () => {
    selectTasks("css-tokens", "run-all-migrations");

    await runTooling({ ...baseOptions, skipGitCheck: true }, program);

    expect(validateGit).not.toHaveBeenCalled();
  });

  test("does not check git for read-only tasks", async () => {
    selectTasks("status", "print-remaining-tokens");

    await runTooling(baseOptions, program);

    expect(validateGit).not.toHaveBeenCalled();
  });
});
