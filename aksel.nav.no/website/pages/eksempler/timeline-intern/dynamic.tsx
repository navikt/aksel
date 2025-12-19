import { useMemo, useState } from "react";
import {
  ChatExclamationmarkFillIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeClosedFillIcon,
  ParasolBeachFillIcon,
  PencilFillIcon,
  PersonSuitFillIcon,
  PiggybankFillIcon,
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

type WindowSize = "2" | "4" | "8";

const Example = () => {
  const [currentWindow, setCurrentWindow] = useState<{
    start: Date;
    end: Date;
  }>(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), 1);

    const start = new Date(today);
    const end = new Date(today);
    end.setMonth(end.getMonth() + 2);
    return { start, end };
  });

  const [windowSize, setWindowSize] = useState<WindowSize>("2");

  function updateWindow(
    direction: "previous" | "next" | "current",
    slideMonths: number,
    _windowSize: WindowSize,
  ) {
    const newDateStart = new Date(currentWindow.start);
    if (direction === "previous") {
      newDateStart.setMonth(newDateStart.getMonth() - slideMonths);
    } else if (direction === "next") {
      newDateStart.setMonth(newDateStart.getMonth() + slideMonths);
    }

    const newDateEnd = new Date(newDateStart);
    newDateEnd.setMonth(newDateEnd.getMonth() + parseInt(_windowSize));

    setCurrentWindow({ start: newDateStart, end: newDateEnd });
  }

  const rows = useMemo(() => {
    return {
      rowOne: getPeriods(currentWindow.start, 1),
      rowTwo: getPeriods(currentWindow.start, 2),
      rowThree: getPeriods(currentWindow.start, 3),
    };
  }, [currentWindow]);

  return (
    <VStack gap="space-12" marginInline="auto" maxWidth="800px">
      <HStack
        gap="space-8"
        align="center"
        aria-controls="timeline-dynamic"
        id="timeline-toolbar"
      >
        <Spacer />
        <HStack gap="space-2" align="center">
          <Button
            data-color="neutral"
            icon={<ChevronLeftIcon title="Forrige periode" />}
            variant="secondary"
            size="small"
            onClick={() => {
              /**
               * We move the window with 50% the total width to make it easier
               * to navigate through the timeline.
               * This is a design choice, and can be adjusted to fit your needs.
               */
              updateWindow("previous", parseInt(windowSize) * 0.5, windowSize);
            }}
          />
          <Button
            data-color="neutral"
            icon={<ChevronRightIcon title="Neste periode" />}
            variant="secondary"
            size="small"
            onClick={() => {
              /**
               * We move the window with 50% the total width to make it easier
               * to navigate through the timeline.
               * This is a design choice, and can be adjusted to fit your needs.
               */
              updateWindow("next", parseInt(windowSize) * 0.5, windowSize);
            }}
          />
        </HStack>
        <ToggleGroup
          variant="neutral"
          size="small"
          value={windowSize}
          onChange={(value) => {
            setWindowSize(value as WindowSize);
            updateWindow("current", parseInt(value), value as WindowSize);
          }}
        >
          <ToggleGroup.Item value="2" label="2 mnd" />
          <ToggleGroup.Item value="4" label="4 mnd" />
          <ToggleGroup.Item value="8" label="8 mnd" />
        </ToggleGroup>
      </HStack>
      <Timeline
        startDate={currentWindow.start}
        endDate={currentWindow.end}
        id="timeline-dynamic"
        aria-controls="timeline-toolbar"
      >
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

/**
 * @internal Don't copy this code to your own project.
 * This is only for generating time periods for the example.
 * You would normally fetch this data from an API or similar.
 */
function getPeriods(startDate: Date, seed: number): TimelinePeriodProps[] {
  /* Seeded random to avoid hydration-errors */
  const rand = seededRandom(seed);

  /* Calculate a range: 3 years before and 3 years after the startDate's year */
  const yearsBack = 2;
  const yearsForward = 2;
  const startYear = startDate.getFullYear() - yearsBack;
  const endYear = startDate.getFullYear() + yearsForward;

  const rangeStart = new Date(startYear, 0, 1);
  const rangeEnd = new Date(endYear, 11, 31);

  const periods: TimelinePeriodProps[] = [];
  let current = new Date(rangeStart);

  while (current < rangeEnd) {
    /* Arbitrary period-size to 'look ok' for all window-sizes  */
    const baseDuration = 10 + Math.floor(rand() * 10);

    /* Gap between periods of 0 -> 30 days */
    const baseGap = Math.floor(rand() * 30);

    const periodStart = new Date(current);
    periodStart.setDate(periodStart.getDate() + baseGap);
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + baseDuration);

    /* Stop if periodStart is after rangeEnd */
    if (periodStart > rangeEnd) break;

    /* Randomly pick a status and icon for the period */
    const statusOptions = [
      {
        status: "warning",
        icon: <PencilFillIcon aria-hidden />,
        statusLabel: "Sykemeldt",
      },
      {
        status: "neutral",
        icon: <ParasolBeachFillIcon aria-hidden />,
        statusLabel: "Ferie",
      },
      {
        status: "success",
        icon: <PiggybankFillIcon aria-hidden />,
        statusLabel: "Utbetaling",
      },
      {
        status: "danger",
        icon: <ChatExclamationmarkFillIcon aria-hidden />,
        statusLabel: "Ubesvart melding",
      },
      {
        status: "info",
        icon: <EnvelopeClosedFillIcon aria-hidden />,
        statusLabel: "Melding",
      },
    ] as const;

    const pick = statusOptions[Math.floor(rand() * statusOptions.length)];
    periods.push({
      start: periodStart,
      end: periodEnd,
      status: pick.status,
      icon: pick.icon,
      statusLabel: pick.statusLabel,
    });

    // Move current to the end of this period
    current = new Date(periodEnd);
  }

  return periods;
}

function seededRandom(localSeed: number) {
  let value = localSeed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Vi anbefaler å la bruker velge tidsperioder som er relevante for dem, og ikke vise alle perioder samtidig. Man kan også løse dette med horisontal scroll, men det kan bli vanskelig å navigere konsistent og ytelsen kan reduseres kraftig hvis for mange noder rendres samtidig.",
};
