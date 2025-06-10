import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import styles from "./Changelog.module.css";
import LogEntry from "./LogEntry";
import MonthHeader from "./MonthHeader";

interface Props {
  list: ENDRINGSLOGG_QUERYResult[];
}

export default function LogEntryList({ list }: Props) {
  return (
    <ul>
      {list &&
        list.map((monthGroup, monthIndex) => (
          // TODO: [endringslogg] Add aria-label on all list items?
          <li key={"log-entry-month-" + monthIndex}>
            <ul
              id={format(
                new Date(monthGroup[0].endringsdato || 0),
                "MMMM-yyy",
                {
                  locale: nb,
                },
              )}
              aria-label={`Endringslogg ${format(
                new Date(monthGroup[0].endringsdato || 0),
                "MMMM yyy",
                { locale: nb },
              )}`}
              className={styles.monthContainer}
            >
              <MonthHeader logEntry={monthGroup[0]} index={monthIndex} />
              {monthGroup.map((logEntry, logIndex) => (
                <LogEntry
                  key={"log-entry-" + logIndex}
                  logEntry={logEntry}
                  index={logIndex}
                  isLastEntry={
                    monthIndex === list.length - 1 &&
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
