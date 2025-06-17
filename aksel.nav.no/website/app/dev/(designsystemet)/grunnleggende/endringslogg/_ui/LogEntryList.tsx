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
    <dl>
      {list.map((monthGroup, monthIndex) => {
        const monthAndYear = format(
          new Date(monthGroup[0].endringsdato || 0),
          "MMMM yyy",
          { locale: nb },
        );
        return (
          <div key={monthAndYear}>
            <MonthHeader monthAndYear={monthAndYear} index={monthIndex} />
            <dd>
              <ul
                id={monthAndYear.replace(" ", "-")}
                className={styles.monthContainer}
              >
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
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
