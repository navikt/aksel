import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { useMedia } from "../hooks";

function TestComponent({ fallback }: { fallback?: boolean }) {
  const media = useMedia("screen and (min-width: 1024px)", fallback);
  return <div data-testid="media-id">{`${media}`}</div>;
}

describe("useMedia", () => {
  test("Should return 'undefined' when no fallback is given", async () => {
    render(<TestComponent />);
    expect(screen.getByTestId("media-id").innerHTML).toEqual("undefined");
  });
  test("Should return fallback", async () => {
    render(<TestComponent fallback={true} />);
    expect(screen.getByTestId("media-id").innerHTML).toEqual("true");
  });
});
