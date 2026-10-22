import type { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";
import { Timeline } from "./index";

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

function ResponsiveAxisTimeline() {
  return (
    <>
      {(["left", "right"] as const).flatMap((direction) =>
        [
          ["2026-05-04", "2026-05-31"],
          ["2024-02-15", "2025-03-05"],
          ["2022-06-15", "2047-07-05"],
        ].map(([start, end]) => (
          <div
            key={`${direction}-${start}`}
            data-axis-size
            style={{ width: "320px" }}
          >
            <Timeline
              direction={direction}
              startDate={new Date(start)}
              endDate={new Date(end)}
            >
              <Timeline.Row label="Row">
                <Timeline.Period
                  start={new Date(start)}
                  end={new Date(end)}
                  status="success"
                />
              </Timeline.Row>
            </Timeline>
          </div>
        )),
      )}
    </>
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

export const AxisLabelsAdaptToWidth: Story = {
  render: () => <ResponsiveAxisTimeline />,
  play: async ({ canvasElement }) => {
    const containers =
      canvasElement.querySelectorAll<HTMLElement>("[data-axis-size]");
    expect(containers).toHaveLength(6);

    for (const container of containers) {
      const axis = container.querySelector<HTMLElement>(
        ".aksel-timeline__axislabels",
      );
      if (!axis) {
        throw new Error("Timeline axis not found");
      }
      const markup = axis.innerHTML;
      const height = axis.getBoundingClientRect().height;
      const selectedDensities = new Set<string | null>();
      const labelColumnWidth =
        container.getBoundingClientRect().width -
        axis.getBoundingClientRect().width;
      const minSlotWidth =
        4.5 *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        );
      const slotPercentages: number[] = [];
      let slotPercentage = 100;
      for (const tier of axis.querySelectorAll<HTMLElement>(
        ".aksel-timeline__axislabels-tier",
      )) {
        slotPercentage *= Number.parseFloat(tier.style.width) / 100;
        slotPercentages.push(slotPercentage);
      }
      const breakpoints = slotPercentages
        .map(
          (percentage) => (minSlotWidth * 100) / percentage + labelColumnWidth,
        )
        .filter((width) => width >= 200 && width <= 2400);
      const widths = [
        200,
        320,
        640,
        960,
        1600,
        2400,
        ...breakpoints.flatMap((width) => [width - 0.1, width, width + 0.1]),
      ];

      for (const width of widths) {
        container.style.width = `${width}px`;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );

        const visibleLabels = [
          ...axis.querySelectorAll<HTMLElement>(
            ".aksel-timeline__axislabels-label",
          ),
        ].filter((label) => label.getClientRects().length > 0);
        const densities = new Set(
          visibleLabels.map((label) =>
            label.getAttribute("data-axis-labels-density"),
          ),
        );
        expect(densities.size, `Axis density at container width ${width}`).toBe(
          1,
        );
        for (const density of densities) {
          selectedDensities.add(density);
        }

        const axisBounds = axis.getBoundingClientRect();
        const textBounds = visibleLabels
          .map((label) => {
            const range = document.createRange();
            range.selectNodeContents(label);
            return range.getBoundingClientRect();
          })
          .sort((a, b) => a.left - b.left);

        for (let i = 0; i < textBounds.length; i++) {
          expect(textBounds[i].left).toBeGreaterThanOrEqual(
            axisBounds.left - 1,
          );
          expect(textBounds[i].right).toBeLessThanOrEqual(axisBounds.right + 1);
          if (i > 0) {
            expect(textBounds[i].left).toBeGreaterThanOrEqual(
              textBounds[i - 1].right,
            );
          }
        }
        expect(axisBounds.height).toBe(height);
        expect(axis.innerHTML).toBe(markup);
      }
      expect(selectedDensities.size).toBeGreaterThan(1);
    }
  },
};
