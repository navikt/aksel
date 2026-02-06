import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../button";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { Heading } from "../../typography";

type DataTableProfilerProps = {
  children: React.ReactNode;
};

type ProfilerEntry = {
  duration: string;
  timestamp: number;
};

type ProfilerState = {
  actualDuration: ProfilerEntry[];
};

function DataTableProfiler({ children }: DataTableProfilerProps) {
  const lastProfilerStateRef = useRef<Record<string, ProfilerState>>({});

  return (
    <div>
      <ProfilerDisplay getLatestData={() => lastProfilerStateRef.current} />
      <React.Profiler
        id="DataTable"
        onRender={(_, phase, actualDuration) => {
          lastProfilerStateRef.current = {
            ...lastProfilerStateRef.current,
            [phase]: {
              actualDuration: rollingLatestValues(
                lastProfilerStateRef.current[phase]?.actualDuration || [],
                { duration: actualDuration.toFixed(2), timestamp: Date.now() },
                10,
              ),
            },
          };
        }}
      >
        <div id="dataTable-profiler-content">{children}</div>
      </React.Profiler>
    </div>
  );
}

function rollingLatestValues(
  arr: ProfilerEntry[],
  newValue: ProfilerEntry,
  maxLength: number,
): ProfilerEntry[] {
  let newArr = [newValue, ...arr];
  if (newArr.length > maxLength) {
    newArr = newArr.slice(0, -1);
  }
  return newArr;
}

function ProfilerDisplay({
  getLatestData,
}: {
  getLatestData: () => Record<string, ProfilerState>;
}) {
  const [open, setOpen] = useState(false);
  const [domStats, setDomStats] = useState<{
    elements: number;
    nodes: number;
  } | null>(null);
  const [, setTick] = useState(0);

  const lastProfilerState = getLatestData();

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      const dataTableElement = document.getElementById(
        "dataTable-profiler-content",
      );
      if (dataTableElement) {
        const walker = document.createTreeWalker(
          dataTableElement,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          null,
        );
        let elements = 0;
        let nodes = 0;
        while (walker.nextNode()) {
          nodes++;
          if (walker.currentNode.nodeType === Node.ELEMENT_NODE) {
            elements++;
          }
        }
        setDomStats({ elements, nodes });
      }
      setTick((t) => t + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [open]);

  const getOpacity = (timestamp: number) => {
    const age = Date.now() - timestamp;
    const maxAge = 10000;
    return Math.max(0.4, 1 - age / maxAge);
  };

  return (
    <VStack asChild>
      <Box
        position="fixed"
        top="space-4"
        right="space-4"
        padding="space-6"
        background="raised"
        borderRadius="8"
        borderWidth="1"
        borderColor="neutral-subtleA"
        style={{ zIndex: 1000 }}
      >
        <Button
          data-color="neutral"
          variant="tertiary"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Profiler" : "Show Profiler"}
        </Button>
        {open && (
          <>
            {!domStats && <div>Loading stats...</div>}
            {domStats && (
              <div>
                <Heading level="2" size="xsmall">
                  DOM Stats:
                </Heading>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  <li
                    style={{ listStyle: "none" }}
                  >{`${domStats.elements} elements`}</li>
                  <li
                    style={{ listStyle: "none" }}
                  >{`${domStats.nodes} nodes`}</li>
                </ul>
              </div>
            )}
            {lastProfilerState.mount && (
              <div>
                <Heading level="2" size="xsmall">
                  Mount:
                </Heading>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {lastProfilerState.mount.actualDuration.map(
                    (entry, index) => (
                      <li
                        style={{
                          listStyle: "none",
                          opacity: getOpacity(entry.timestamp),
                          transition: "opacity 0.5s",
                        }}
                        key={index}
                      >{`${entry.duration} ms`}</li>
                    ),
                  )}
                </ul>
              </div>
            )}
            {lastProfilerState.update && (
              <div>
                <Heading level="2" size="xsmall">
                  Update:
                </Heading>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {lastProfilerState.update.actualDuration.map(
                    (entry, index) => (
                      <li
                        style={{
                          listStyle: "none",
                          opacity: getOpacity(entry.timestamp),
                          transition: "opacity 0.5s",
                        }}
                        key={index}
                      >{`${entry.duration} ms`}</li>
                    ),
                  )}
                </ul>
              </div>
            )}
            {lastProfilerState["nested-update"] && (
              <div>
                <Heading level="2" size="xsmall">
                  Nested-update
                </Heading>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {lastProfilerState["nested-update"].actualDuration.map(
                    (entry, index) => (
                      <li
                        style={{
                          listStyle: "none",
                          opacity: getOpacity(entry.timestamp),
                          transition: "opacity 0.5s",
                        }}
                        key={index}
                      >{`${entry.duration} ms`}</li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
}

export { DataTableProfiler };
