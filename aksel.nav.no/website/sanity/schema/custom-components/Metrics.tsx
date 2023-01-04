import { Down, Eye } from "@navikt/ds-icons";
import { Table, ToggleGroup } from "@navikt/ds-react";
import { Stack } from "@sanity/ui";
import { getWeek, getYear } from "date-fns";
import { useRef, useState } from "react";
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
  const totalViews: any = useFormValue(["metrics", "pageviews", "summary"]);
  const weeks: any = useFormValue(["metrics", "pageviews", "weeks"]);
  const avgScrollLength = useFormValue(["metrics", "avgScrollLength"]);
  const avgTime = useFormValue(["metrics", "avgTime"]);
  const inactiveCount: any = useFormValue(["metrics", "inactiveCount"]);
  const [selected, setSelected] = useState("Sidevisninger");
  const toggleRef = useRef(null);

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
      <dl className="mb-8 flex flex-wrap justify-center gap-y-4">
        {totalViews && (
          <Metric description="Totale sidevisninger" value={totalViews} />
        )}

        {weeks && (
          <Metric description="Antall uker målt" value={weeks.length} />
        )}

        {avgScrollLength && (
          <Metric
            description="Gjennomsnittlig scrollldybde"
            value={avgScrollLength + "%"}
          />
        )}
        {avgTime && (
          <Metric
            description="Gjennomsnittlig tid på siden"
            value={parseTime(Number(avgTime))}
          />
        )}
        {inactiveCount && (
          <Metric description="Totale inaktive" value={inactiveCount} />
        )}
      </dl>
      {parsedWeeks && (
        <>
          <ToggleGroup
            aria-hidden
            defaultValue={selected}
            onChange={setSelected}
            size="small"
            className="mx-auto mb-8"
            ref={toggleRef}
          >
            <ToggleGroup.Item value="Sidevisninger">
              <Eye aria-hidden />
              Sidevisninger
            </ToggleGroup.Item>
            <ToggleGroup.Item value="Scroll">
              <Down aria-hidden />
              Scrolldybde
            </ToggleGroup.Item>
          </ToggleGroup>
          <ResponsiveContainer aria-hidden width="100%" height={300}>
            <LineChart width={500} height={300} data={parsedWeeks}>
              <XAxis dataKey="weekNumber" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selected}
                stroke="#004367"
                activeDot={{ r: 8 }}
              />
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

interface MetricProps {
  description: string;
  value: string;
}

const Metric = ({ description, value }: MetricProps) => {
  return (
    <div className="w-1/2 text-center">
      <dt className="mb-2 text-xl">{description}</dt>
      <dd className="text-3xl">{value}</dd>
    </div>
  );
};

export default Metrics;
