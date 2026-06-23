import type { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";
import Timeline from "./Timeline";

export default {
  title: "ds-react/Timeline/Tests",
  component: Timeline,
  parameters: { chromatic: { disable: true } },
  tags: ["play-fn"],
};

type Story = StoryObj<typeof Timeline>;

function getPeriodsInRow(canvasElement: HTMLElement, rowIndex: number) {
  const rows = canvasElement.querySelectorAll<HTMLElement>(
    "[data-timeline-row]",
  );
  return rows[rowIndex].querySelectorAll<HTMLElement>("[data-timeline-period]");
}

function getAllPins(canvasElement: HTMLElement) {
  return canvasElement.querySelectorAll<HTMLElement>("[data-timeline-pin]");
}

function TwoRowTimeline() {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline
        startDate={new Date("Jan 1 2022")}
        endDate={new Date("Dec 31 2022")}
      >
        <Timeline.Row label="Row 1">
          <Timeline.Period
            start={new Date("Jan 1 2022")}
            end={new Date("Jan 31 2022")}
            status="success"
          />
          <Timeline.Period
            start={new Date("May 1 2022")}
            end={new Date("May 31 2022")}
            status="warning"
          />
          <Timeline.Period
            start={new Date("Sep 1 2022")}
            end={new Date("Sep 30 2022")}
            status="danger"
          />
        </Timeline.Row>
        <Timeline.Row label="Row 2">
          <Timeline.Period
            start={new Date("Mar 1 2022")}
            end={new Date("Mar 31 2022")}
            status="neutral"
          />
          <Timeline.Period
            start={new Date("Jul 1 2022")}
            end={new Date("Jul 31 2022")}
            status="info"
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
}

function TwoRowTimelineWithPins() {
  return (
    <div style={{ width: "80vw" }}>
      <Timeline
        startDate={new Date("Jan 1 2022")}
        endDate={new Date("Dec 31 2022")}
      >
        <Timeline.Pin date={new Date("Apr 1 2022")}>Pin A</Timeline.Pin>
        <Timeline.Pin date={new Date("Aug 1 2022")}>Pin B</Timeline.Pin>
        <Timeline.Row label="Row 1">
          <Timeline.Period
            start={new Date("Jan 1 2022")}
            end={new Date("Jan 31 2022")}
            status="success"
          />
          <Timeline.Period
            start={new Date("May 1 2022")}
            end={new Date("May 31 2022")}
            status="warning"
          />
        </Timeline.Row>
        <Timeline.Row label="Row 2">
          <Timeline.Period
            start={new Date("Mar 1 2022")}
            end={new Date("Mar 31 2022")}
            status="neutral"
          />
        </Timeline.Row>
      </Timeline>
    </div>
  );
}

export const HorizontalPeriodNavigation: Story = {
  render: () => <TwoRowTimeline />,
  play: async ({ canvasElement }) => {
    const row1 = getPeriodsInRow(canvasElement, 0);

    // ArrowRight traverses forward
    row1[0].focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(row1[1]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(row1[2]).toHaveFocus();

    // ArrowLeft traverses backward
    await userEvent.keyboard("{ArrowLeft}");
    expect(row1[1]).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(row1[0]).toHaveFocus();

    // Stops at boundaries
    await userEvent.keyboard("{ArrowLeft}");
    expect(row1[0]).toHaveFocus();
    row1[2].focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(row1[2]).toHaveFocus();
  },
};

export const VerticalRowNavigation: Story = {
  render: () => <TwoRowTimeline />,
  play: async ({ canvasElement }) => {
    const row1 = getPeriodsInRow(canvasElement, 0);
    const row2 = getPeriodsInRow(canvasElement, 1);

    // ArrowDown moves to next row
    row1[0].focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(row2[0]).toHaveFocus();

    // ArrowDown on last row does nothing
    await userEvent.keyboard("{ArrowDown}");
    expect(row2[0]).toHaveFocus();

    // ArrowUp moves back to previous row
    await userEvent.keyboard("{ArrowUp}");
    expect(row1[0]).toHaveFocus();

    // ArrowUp on first row with no pin does nothing
    await userEvent.keyboard("{ArrowUp}");
    expect(row1[0]).toHaveFocus();
  },
};

export const PinNavigation: Story = {
  render: () => <TwoRowTimelineWithPins />,
  play: async ({ canvasElement }) => {
    const pins = getAllPins(canvasElement);
    const row1 = getPeriodsInRow(canvasElement, 0);

    // ArrowRight/Left between pins
    pins[0].focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(pins[1]).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(pins[0]).toHaveFocus();

    // Stops at pin boundaries
    await userEvent.keyboard("{ArrowLeft}");
    expect(pins[0]).toHaveFocus();
    pins[1].focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(pins[1]).toHaveFocus();

    // ArrowDown from pin focuses first period of row 1
    pins[0].focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(row1[0]).toHaveFocus();

    // ArrowUp from row 1 returns to first pin
    await userEvent.keyboard("{ArrowUp}");
    expect(pins[0]).toHaveFocus();
  },
};
