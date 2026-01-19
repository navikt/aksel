import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "../../../../button";
import { Slot } from "../Slot";

describe("Slot", () => {
  describe("should handle forwarning events", () => {
    test("Should call onClick when event is on Slot", async () => {
      const handleClick = vi.fn();
      render(
        <Slot onClick={handleClick}>
          <Button>Button</Button>
        </Slot>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("Should call onClick when event is on Child", async () => {
      const handleClick = vi.fn();
      render(
        <Slot>
          <Button onClick={handleClick}>Button</Button>
        </Slot>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("Should call onClick when event is on Child and Slot", async () => {
      const handleClickSlot = vi.fn();
      const handleClick = vi.fn();
      render(
        <Slot onClick={handleClickSlot}>
          <Button onClick={handleClick}>Button</Button>
        </Slot>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClickSlot).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("Should call onClick when event is on Child and undefined on Slot", async () => {
      const handleClick = vi.fn();
      render(
        <Slot onClick={undefined}>
          <Button onClick={handleClick}>Button</Button>
        </Slot>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("Should call onClick when event is on Slot and undefined on Child", async () => {
      const handleClick = vi.fn();
      render(
        <Slot onClick={handleClick}>
          <Button onClick={undefined}>Button</Button>
        </Slot>,
      );
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("should handle className", () => {
    test("Should merge className correctly when Child and Slot has className", async () => {
      render(
        <Slot className="class1">
          <button className="class2 class2--inline">Button</button>
        </Slot>,
      );
      expect(screen.getByRole("button").className).toEqual(
        "class1 class2 class2--inline",
      );
    });

    test("Should merge className correctly when Child has className and Slot has undefined className", async () => {
      render(
        <Slot className={undefined}>
          <button className="class2 class2--inline">Button</button>
        </Slot>,
      );
      expect(screen.getByRole("button").className).toEqual(
        "class2 class2--inline",
      );
    });

    test("Should merge className correctly when Slot has className and Child has undefined className", async () => {
      render(
        <Slot className="class1">
          <button className={undefined}>Button</button>
        </Slot>,
      );
      expect(screen.getByRole("button").className).toEqual("class1");
    });
  });
});
