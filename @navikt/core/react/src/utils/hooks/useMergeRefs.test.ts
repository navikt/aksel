import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { useMergeRefs } from "./useMergeRefs";

describe("useMergeRefs", () => {
  test("returns null when all refs are null or undefined", () => {
    const { result } = renderHook(() => useMergeRefs(null, undefined));
    expect(result.current).toBeNull();
  });

  test("assigns instance to object ref", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return { merged: useMergeRefs(ref, null), ref };
    });

    const div = document.createElement("div");
    result.current.merged?.(div);

    expect(result.current.ref.current).toBe(div);
  });

  test("calls function ref with instance", () => {
    const fnRef = vi.fn();
    const { result } = renderHook(() => useMergeRefs(fnRef, null));

    const div = document.createElement("div");
    result.current?.(div);

    expect(fnRef).toHaveBeenCalledWith(div);
  });

  test("handles mixed ref types", () => {
    const fnRef = vi.fn();
    const { result } = renderHook(() => {
      const objRef = useRef<HTMLDivElement | null>(null);
      return { merged: useMergeRefs(objRef, fnRef, null), objRef };
    });

    const div = document.createElement("div");
    result.current.merged?.(div);

    expect(result.current.objRef.current).toBe(div);
    expect(fnRef).toHaveBeenCalledWith(div);
  });

  test("cleanup resets object ref to null", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return { merged: useMergeRefs(ref, null), ref };
    });

    const div = document.createElement("div");
    result.current.merged?.(div);
    expect(result.current.ref.current).toBe(div);

    result.current.merged?.(null);
    expect(result.current.ref.current).toBeNull();
  });

  test("cleanup calls returned cleanup function from callback ref", () => {
    const cleanup = vi.fn();
    const fnRef = vi.fn().mockReturnValue(cleanup);
    const { result } = renderHook(() => useMergeRefs(fnRef, null));

    const div1 = document.createElement("div");
    result.current?.(div1);

    const div2 = document.createElement("div");
    result.current?.(div2);

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(fnRef).not.toHaveBeenCalledWith(null);
  });

  test("runs previous cleanup before assigning new instance", () => {
    const callOrder: string[] = [];
    const cleanup = vi.fn(() => callOrder.push("cleanup"));
    const fnRef = vi.fn(() => {
      callOrder.push("ref");
      return cleanup;
    });

    const { result } = renderHook(() => useMergeRefs(fnRef, null));

    result.current?.(document.createElement("div"));
    result.current?.(document.createElement("div"));

    expect(callOrder).toEqual(["ref", "cleanup", "ref"]);
  });
});
