import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test } from "vitest";
import { Tabs } from "./Tabs";

const TestTabs = ({
  value,
  onChange,
  defaultValue,
  selectionFollowsFocus,
  loop,
  iconPosition,
}: any) => (
  <Tabs
    value={value}
    onChange={onChange}
    defaultValue={defaultValue}
    selectionFollowsFocus={selectionFollowsFocus}
    loop={loop}
    iconPosition={iconPosition}
  >
    <Tabs.List data-testid="tablist">
      <Tabs.Tab value="tab1" data-testid="tab1" label="Tab 1" />
      <Tabs.Tab value="tab2" data-testid="tab2" label="Tab 2" />
      <Tabs.Tab value="tab3" data-testid="tab3" label="Tab 3" />
    </Tabs.List>
    <Tabs.Panel value="tab1" data-testid="tabpanel1">
      Tabpanel 1
    </Tabs.Panel>
    <Tabs.Panel value="tab2" data-testid="tabpanel2">
      Tabpanel 2
    </Tabs.Panel>
    <Tabs.Panel value="tab3" data-testid="tabpanel3">
      Tabpanel 3
    </Tabs.Panel>
  </Tabs>
);

describe("Tabs", () => {
  test("sets default value correctly", () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab2 = screen.getByTestId("tab2");
    const panel2 = screen.getByTestId("tabpanel2");

    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(panel2).toHaveTextContent("Tabpanel 2");
  });

  test("label-connection between tab and tabpanel is correct", async () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab2 = screen.getByTestId("tab2");
    const panel2 = screen.getByTestId("tabpanel2");

    const controlsId = tab2.getAttribute("aria-controls");
    const panelLabelledBy = panel2.getAttribute("aria-labelledby");

    expect(controlsId).toEqual(panel2.id);
    expect(tab2.id).toEqual(panelLabelledBy);
  });

  test("sets correct attributes on active tab", () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab2 = screen.getByTestId("tab2");

    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("role", "tab");
    expect(tab2).toHaveAttribute("aria-controls");
    expect(tab2).toHaveAttribute("tabindex", "0");
  });

  test("sets correct attributes on idle tab", () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab1 = screen.getByTestId("tab1");

    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab1).toHaveAttribute("role", "tab");
    expect(tab1).toHaveAttribute("aria-controls");
    expect(tab1).toHaveAttribute("tabindex", "-1");
  });

  test("sets correct attributes on active tabpanel", () => {
    render(<TestTabs defaultValue="tab2" />);
    const panel2 = screen.getByTestId("tabpanel2");

    expect(panel2).toHaveAttribute("aria-labelledby");
    expect(panel2).toHaveAttribute("role", "tabpanel");
    expect(panel2).toHaveAttribute("tabindex", "0");
    expect(panel2).toHaveTextContent("Tabpanel 2");
    expect(panel2).toHaveStyle({ display: "block" });
  });

  test("sets correct attributes on idle tabpanel", () => {
    render(<TestTabs defaultValue="tab1" />);
    const panel2 = screen.getByTestId("tabpanel2");

    expect(panel2).toHaveAttribute("aria-labelledby");
    expect(panel2).toHaveAttribute("role", "tabpanel");
    expect(panel2).toHaveAttribute("tabindex", "0");
    expect(panel2).toBeEmptyDOMElement();
    expect(panel2).toHaveStyle({ display: "none" });
  });

  test("sets tabindex to 0 when focused", () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab2 = screen.getByTestId("tab2");

    fireEvent.focus(tab2);
    expect(tab2).toHaveAttribute("tabindex", "0");
  });

  test("rowing tabindex keydown moves focus", () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab1 = screen.getByTestId("tab1");

    expect(tab1).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    expect(tab1).toHaveAttribute("tabindex", "-1");
    expect(screen.getByTestId("tab2")).toHaveAttribute("tabindex", "0");
    expect(screen.getByTestId("tab2")).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  test("selectionFollowsFocus moves active tabs", () => {
    render(<TestTabs defaultValue="tab1" selectionFollowsFocus />);
    const tab1 = screen.getByTestId("tab1");

    expect(tab1).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    expect(screen.getByTestId("tab2")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("tab2")).toHaveAttribute("tabindex", "0");
  });

  test("tabbing from tabs moves focus to tabPanel", async () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab1 = screen.getByTestId("tab1");

    tab1.focus();
    await userEvent.tab();

    expect(screen.getByTestId("tabpanel1")).toHaveFocus();
  });

  test("shift+tab back to tablist should focus selected tab", async () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab1 = screen.getByTestId("tab1");

    /* Move focus to tab2 */
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(screen.getByTestId("tab2")).toHaveFocus();

    /* Move focus to tabPanel */
    await userEvent.tab();
    expect(screen.getByTestId("tabpanel1")).toHaveFocus();

    /* Move focus back to tablist, now tab1 should have focus */
    await userEvent.tab({ shift: true });
    expect(screen.getByTestId("tab1")).toHaveFocus();
  });
});
