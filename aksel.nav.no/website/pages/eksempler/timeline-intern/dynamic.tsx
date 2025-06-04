import { useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeClosedIcon,
  ParasolBeachIcon,
  PencilIcon,
  PersonSuitFillIcon,
  PiggybankIcon,
} from "@navikt/aksel-icons";
import {
  Button,
  HStack,
  Spacer,
  Timeline,
  TimelinePeriodProps,
  ToggleGroup,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

type WindowSize = "1" | "3" | "8";

const Example = () => {
  const [currentWindow, setCurrentWindow] = useState<{
    start: Date;
    end: Date;
  }>(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      start: today,
      end: new Date(today.setMonth(today.getMonth() + 1)),
    };
  });

  const [windowSize, setWindowSize] = useState<WindowSize>("1");

  function updateWindow(
    direction: "previous" | "next" | "current",
    window: typeof windowSize,
  ) {
    const newDateStart = new Date(currentWindow.start);
    if (direction === "previous") {
      newDateStart.setMonth(newDateStart.getMonth() - parseInt(window));
    } else if (direction === "next") {
      newDateStart.setMonth(newDateStart.getMonth() + parseInt(window));
    }

    const newDateEnd = new Date(newDateStart);
    newDateEnd.setMonth(newDateEnd.getMonth() + parseInt(window));

    setCurrentWindow({ start: newDateStart, end: newDateEnd });
  }

  const rows = useMemo(() => {
    return {
      rowOne: getPeriods(currentWindow.start, windowSize, 1),
      rowTwo: getPeriods(currentWindow.start, windowSize, 2),
      rowThree: getPeriods(currentWindow.start, windowSize, 3),
    };
  }, [currentWindow, windowSize]);

  return (
    <VStack gap="space-12" minWidth="800px">
      <HStack gap="space-8" align="center">
        <Spacer />
        <HStack gap="space-2" align="center">
          <Button
            icon={<ChevronLeftIcon title="Forrige periode" />}
            variant="secondary-neutral"
            size="small"
            onClick={() => updateWindow("previous", windowSize)}
          />
          <Button
            icon={<ChevronRightIcon title="Neste periode" />}
            variant="secondary-neutral"
            size="small"
            onClick={() => updateWindow("next", windowSize)}
          />
        </HStack>
        <ToggleGroup
          variant="neutral"
          size="small"
          value={windowSize}
          onChange={(value) => {
            setWindowSize(value as WindowSize);
            updateWindow("current", value as WindowSize);
          }}
        >
          <ToggleGroup.Item value="1" label="1 mnd" />
          <ToggleGroup.Item value="3" label="3 mnd" />
          <ToggleGroup.Item value="8" label="8 mnd" />
        </ToggleGroup>
      </HStack>

      <Timeline startDate={currentWindow.start} endDate={currentWindow.end}>
        <Timeline.Row
          label="Person A"
          icon={<PersonSuitFillIcon aria-hidden fontSize="1.5rem" />}
        >
          {rows.rowOne.map((p) => (
            <Timeline.Period
              key={p.start.toString()}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
            />
          ))}
        </Timeline.Row>
        <Timeline.Row
          label="Person B"
          icon={<PersonSuitFillIcon aria-hidden fontSize="1.5rem" />}
        >
          {rows.rowTwo.map((p) => (
            <Timeline.Period
              key={p.start.toString()}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
            />
          ))}
        </Timeline.Row>
        <Timeline.Row
          label="Person C"
          icon={<PersonSuitFillIcon aria-hidden fontSize="1.5rem" />}
        >
          {rows.rowThree.map((p) => (
            <Timeline.Period
              key={p.start.toString()}
              start={p.start}
              end={p.end}
              status={p.status}
              icon={p.icon}
              statusLabel={p.statusLabel}
            />
          ))}
        </Timeline.Row>
      </Timeline>
    </VStack>
  );
};

// Deterministic pseudo-random number generator (LCG)
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function getPeriods(
  startDate: Date,
  windowSize: WindowSize,
  seed: number,
): TimelinePeriodProps[] {
  const rand = seededRandom(
    startDate.getTime() + parseInt(windowSize) * 10000 + seed,
  );
  const months = parseInt(windowSize);
  const windowDays = Math.round(
    (new Date(
      startDate.getFullYear(),
      startDate.getMonth() + months,
      startDate.getDate(),
    ).getTime() -
      startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  // Decide number of periods (1-6)
  const numPeriods = 1 + Math.floor(rand() * 6);
  const periods: TimelinePeriodProps[] = [];
  const usedRanges: { start: number; end: number }[] = [];

  for (let i = 0; i < numPeriods; i++) {
    // For larger windows, periods are proportionally shorter
    // Base: 30% for 1 month, 10% for 3 months, 5% for 8 months
    let basePercent = 0.3;
    if (months >= 8) basePercent = 0.05;
    else if (months >= 3) basePercent = 0.1;

    // Add a little random variation (up to +5%)
    let duration = Math.round(windowDays * (basePercent + rand() * 0.05));
    duration = Math.max(6, duration); // at least 6 days
    // Start day: anywhere in window, but ensure it fits
    let maxStart = windowDays - duration;
    if (maxStart < 0) maxStart = 0;
    let startOffset = Math.floor(rand() * (maxStart + 1));
    // Avoid any overlap: check with previous periods
    let attempts = 0;
    while (attempts < 20) {
      const overlap = usedRanges.some(
        (r) => startOffset < r.end && startOffset + duration > r.start,
      );
      if (!overlap) break;
      startOffset = Math.floor(rand() * (maxStart + 1));
      attempts++;
    }
    // If still overlapping after attempts, skip this period
    const finalOverlap = usedRanges.some(
      (r) => startOffset < r.end && startOffset + duration > r.start,
    );
    if (finalOverlap) continue;
    usedRanges.push({ start: startOffset, end: startOffset + duration });
    const periodStart = new Date(startDate.getTime());
    periodStart.setDate(periodStart.getDate() + startOffset);
    const periodEnd = new Date(periodStart.getTime());
    periodEnd.setDate(periodEnd.getDate() + duration);
    // Pick a status/icon
    const statusOptions = [
      {
        status: "warning",
        icon: <PencilIcon aria-hidden />,
        statusLabel: "Sykemeldt",
      },
      {
        status: "neutral",
        icon: <ParasolBeachIcon aria-hidden />,
        statusLabel: "Ferie",
      },
      {
        status: "success",
        icon: <PiggybankIcon aria-hidden />,
        statusLabel: "Utbetaling",
      },
      {
        status: "info",
        icon: <EnvelopeClosedIcon aria-hidden />,
        statusLabel: "Melding",
      },
    ];
    const pick = statusOptions[Math.floor(rand() * statusOptions.length)];

    periods.push({
      start: periodStart,
      end: periodEnd,
      status: pick.status as any,
      icon: pick.icon,
      statusLabel: pick.statusLabel,
    });
  }

  // Sort by start date
  periods.sort((a, b) => a.start.getTime() - b.start.getTime());
  return periods;
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Vi anbefaler å la bruker velge tidsperioder som er relevante for dem, og ikke vise alle perioder samtidig.",
};
