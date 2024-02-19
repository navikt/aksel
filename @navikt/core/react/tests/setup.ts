/**
 * Setup-file is required to avoid "chai" type errors when using testing-library with vitest
 */
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);
