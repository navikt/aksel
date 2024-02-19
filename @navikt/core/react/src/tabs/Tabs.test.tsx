import { act, fireEvent, render, screen } from "@testing-library/react";
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
    const tab = screen.getByTestId("tab2");
    const panel = screen.getByTestId("tabpanel2");

    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(panel).toHaveTextContent("Tabpanel 2");
  });

  test("label-connection between tab and tabpanel is correct", async () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab = screen.getByTestId("tab2");
    const panel = screen.getByTestId("tabpanel2");

    const controlsId = tab.getAttribute("aria-controls");
    const panelLabelledBy = panel.getAttribute("aria-labelledby");

    expect(controlsId).toEqual(panel.id);
    expect(tab.id).toEqual(panelLabelledBy);
  });

  test("sets correct attributes on active tab", () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab = screen.getByTestId("tab2");

    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveAttribute("role", "tab");
    expect(tab).toHaveAttribute("aria-controls");
    expect(tab).toHaveAttribute("tabindex", "0");
  });

  test("sets correct attributes on idle tab", () => {
    render(<TestTabs defaultValue="tab2" />);
    const tab = screen.getByTestId("tab1");

    expect(tab).toHaveAttribute("aria-selected", "false");
    expect(tab).toHaveAttribute("role", "tab");
    expect(tab).toHaveAttribute("aria-controls");
    expect(tab).toHaveAttribute("tabindex", "-1");
  });

  test("sets correct attributes on active tabpanel", () => {
    render(<TestTabs defaultValue="tab2" />);
    const panel = screen.getByTestId("tabpanel2");

    expect(panel).toHaveAttribute("aria-labelledby");
    expect(panel).toHaveAttribute("role", "tabpanel");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toHaveTextContent("Tabpanel 2");
    expect(panel).toHaveStyle({ display: "block" });
  });

  test("sets correct attributes on idle tabpanel", () => {
    render(<TestTabs defaultValue="tab1" />);
    const panel = screen.getByTestId("tabpanel2");

    expect(panel).toHaveAttribute("aria-labelledby");
    expect(panel).toHaveAttribute("role", "tabpanel");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toBeEmptyDOMElement();
    expect(panel).toHaveStyle({ display: "none" });
  });

  test("sets tabindex to 0 when focused", () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab = screen.getByTestId("tab2");

    fireEvent.focus(tab);
    expect(tab).toHaveAttribute("tabindex", "0");
  });

  test("rowing tabindex keydown moves focus", () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab = screen.getByTestId("tab1");

    expect(tab).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(tab, { key: "ArrowRight" });

    expect(tab).toHaveAttribute("tabindex", "-1");
    expect(screen.getByTestId("tab2")).toHaveAttribute("tabindex", "0");
    expect(screen.getByTestId("tab2")).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  test("selectionFollowsFocus moves active tabs", () => {
    render(<TestTabs defaultValue="tab1" selectionFollowsFocus />);
    const tab = screen.getByTestId("tab1");

    expect(tab).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(tab, { key: "ArrowRight" });

    expect(screen.getByTestId("tab2")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("tab2")).toHaveAttribute("tabindex", "0");
  });

  test("tabbing from tabs moves focus to tabPanel", async () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab = screen.getByTestId("tab1");

    tab.focus();
    await userEvent.tab();

    expect(screen.getByTestId("tabpanel1")).toHaveFocus();
  });

  test("shift+tab back to tablist should focus selected tab", async () => {
    render(<TestTabs defaultValue="tab1" />);
    const tab = screen.getByTestId("tab1");

    /* Move focus to tab2 */
    fireEvent.keyDown(tab, { key: "ArrowRight" });
    expect(screen.getByTestId("tab2")).toHaveFocus();

    /* Move focus to tabPanel */
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      /* Tablist handles tabbing with setTimeout, so we need to use act */
      await userEvent.tab();
    });

    expect(screen.getByTestId("tabpanel1")).toHaveFocus();
    /* Move focus back to tablist, now tab1 should have focus */

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.tab({ shift: true });
    });
    expect(screen.getByTestId("tab1")).toHaveFocus();
  });
});
