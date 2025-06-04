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
    <VStack gap="space-12" minWidth="800px">
      <HStack gap="space-8" align="center">
        <Spacer />
        <HStack gap="space-2" align="center">
          <Button
            icon={<ChevronLeftIcon title="Forrige periode" />}
            variant="secondary-neutral"
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
            icon={<ChevronRightIcon title="Neste periode" />}
            variant="secondary-neutral"
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

/**
 * @internal Dont copy this code to your own project.
 * This code is only for generating example data
 *
 * Code for generating time periods in the example.
 * This part would normally not be part of your application code,
 * and fetch data from an API or similar.
 */
function getPeriods(startDate: Date, seed: number): TimelinePeriodProps[] {
  /* Seeded random to avoid hydration-errors */
  const rand = seededRandom(startDate.getTime() + seed);

  /* We generate periods based on accounting for the largest possible window */
  const numPeriods = 12;
  const periods: TimelinePeriodProps[] = [];
  let lastEnd = 0;

  for (let i = 0; i < numPeriods; i++) {
    /* Arbitrary period-size to 'look ok' for all window-sizes  */
    const baseDuration = 10 + Math.floor(rand() * 10);

    /* Gap between periods of 0 -> 30 days */
    const baseGap = Math.floor(rand() * 30);

    /**
     * We make sure to avoid large overlaps between periods
     * In reality this can and will happend, so should really be handled by the component itself...
     */
    const startOffset = lastEnd + baseGap;
    const duration = baseDuration;
    lastEnd = startOffset + duration;
    const periodStart = new Date(startDate.getTime());
    periodStart.setDate(periodStart.getDate() + startOffset);
    const periodEnd = new Date(periodStart.getTime());
    periodEnd.setDate(periodEnd.getDate() + duration);

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
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Vi anbefaler å la bruker velge tidsperioder som er relevante for dem, og ikke vise alle perioder samtidig. Man kan også løse dette med horisontal scroll, men det kan bli vanskelig å navigere konsistent og ytelsen kan reduseres kraftig hvis for mange noder rendres samtidig.",
};
