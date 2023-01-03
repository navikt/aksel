import { Table } from "@navikt/ds-react";
import { Heading, Stack } from "@sanity/ui";
import { getWeek, getYear } from "date-fns";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFormValue } from "sanity";

export const Metrics = () => {
  const totalViews = useFormValue(["metrics", "pageviews", "summary"]);
  const weeks: any = useFormValue(["metrics", "pageviews", "weeks"]);
  const avgScrollLength = useFormValue(["metrics", "avgScrollLength"]);
  const avgTime = useFormValue(["metrics", "avgTime"]);
  const inactiveCount = useFormValue(["metrics", "inactiveCount"]);

  const parsedWeeks = weeks?.map((week: any) => {
    return {
      ...week,
      weekNumber: getWeek(new Date(week.week)),
      Sidevisninger: week.views,
      Scroll: week.scrollLength,
    };
  });

  const parseTime = (s: number) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  return (
    <Stack>
      <Heading as="h2" size={3}>
        Statistikk
      </Heading>
      {totalViews && (
        <p>
          <>Totale sidevisninger: {totalViews}</>
        </p>
      )}
      {weeks && <p>Totale uker: {weeks?.length}</p>}
      {avgScrollLength && (
        <p>
          <>Gjennomsnitt scrolllengde: {avgScrollLength}%</>
        </p>
      )}
      {avgTime && (
        <p>
          <>Gjennomsnitt tid på siden: {parseTime(Number(avgTime))}</>
        </p>
      )}
      {inactiveCount && (
        <p>
          <>Totale inaktive: {inactiveCount}</>
        </p>
      )}
      {parsedWeeks && (
        <>
          <ResponsiveContainer aria-hidden width="100%" height={300}>
            <LineChart width={500} height={300} data={parsedWeeks}>
              <XAxis dataKey="weekNumber" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Sidevisninger"
                stroke="#004367"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Scroll" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <Table className="sr-only">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Uke/år</Table.HeaderCell>
                <Table.HeaderCell scope="col">Sidevisninger</Table.HeaderCell>
                <Table.HeaderCell scope="col">Scrolldybde</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {parsedWeeks.map(
                ({ views, scrollLength, weekNumber, week }, i) => {
                  return (
                    <Table.Row key={`${i}-${week}`}>
                      <Table.HeaderCell scope="row">
                        {weekNumber}/{getYear(new Date(week))}
                      </Table.HeaderCell>
                      <Table.DataCell>{views || "Mangler data"}</Table.DataCell>
                      <Table.DataCell>
                        {(scrollLength && scrollLength + "%") || "Mangler data"}
                      </Table.DataCell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        </>
      )}
    </Stack>
  );
};

export default Metrics;
