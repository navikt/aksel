"use client";

import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import LogEntry from "./LogEntry";
import MonthHeader from "./MonthHeader";

const getMonthAndYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("NO", {
    month: "long",
    year: "numeric",
  });
};

interface Props {
  list: ENDRINGSLOGG_QUERYResult;
}

// TODO: [endringslogg] Clean up styling, commit to a convention
export default function ChronologicalList({ list }: Props) {
  // TODO: [endringslogg] Remove before production
  console.dir(list);
  const groupedByMonth = list.reduce<ENDRINGSLOGG_QUERYResult[]>(
    (acc, logEntry) => {
      const monthKey = getMonthAndYear(logEntry.endringsdato);
      const lastGroup = acc[acc.length - 1];
      if (
        !lastGroup ||
        getMonthAndYear(lastGroup[0].endringsdato) !== monthKey
      ) {
        acc.push([logEntry]);
      } else {
        lastGroup.push(logEntry);
      }
      return acc;
    },
    [],
  );
  console.dir(groupedByMonth);

  return (
    <ul>
      {groupedByMonth &&
        groupedByMonth.map((monthGroup, mIndex) => (
          // TODO: [endringslogg] Add aria-label on all list items?
          <li key={"log-entry-month-" + mIndex}>
            <ul
              aria-label={`Endringslogg ${getMonthAndYear(
                monthGroup[0].endringsdato,
              )}`}
            >
              <MonthHeader logEntry={monthGroup[0]} index={mIndex} />
              {monthGroup.map((logEntry, logIndex) => (
                <LogEntry
                  key={"log-entry-" + logIndex}
                  logEntry={logEntry}
                  index={logIndex}
                  isLastEntry={
                    mIndex === groupedByMonth.length - 1 &&
                    logIndex === monthGroup.length - 1
                  }
                />
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
}
