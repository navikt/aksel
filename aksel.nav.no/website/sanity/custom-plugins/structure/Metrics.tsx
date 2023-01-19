import { Down, Eye } from "@navikt/ds-icons";
import { Loader, Table, ToggleGroup } from "@navikt/ds-react";
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
import { useClient } from "sanity";
import useSWR from "swr";

export const Metrics = ({ documentId }) => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const toggleRef = useRef(null);
  const [selected, setSelected] = useState("Sidevisninger");
  const { data, error, isValidating } = useSWR(
    `*[_type == "metrics" && references($id)]`,
    (query) =>
      client.fetch(query, {
        id: documentId,
      })
  );

  if (isValidating) {
    return (
      <div className="grid place-items-center px-6">
        <div className="mx-auto mt-24">
          <Loader size="xlarge" variant="neutral" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          En feil oppstod, prøv å laste side på nytt eller kontakt utvikler.
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          Denne siden har ingen metrikker.
        </div>
      </div>
    );
  }

  const { pageviews, weeksObj, avgScrollLength, avgTime } = data[0];

  const parsedWeeks = weeksObj?.weeks?.map((week: any) => {
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
    <div className="mx-auto mt-8 w-full px-6">
      <Stack>
        <dl className="mb-8 flex flex-wrap justify-center gap-y-4">
          {pageviews && (
            <Metric description="Totale sidevisninger" value={pageviews} />
          )}

          {weeksObj?.weeks && (
            <Metric
              description="Antall uker målt"
              value={weeksObj.weeks.length}
            />
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
                        <Table.DataCell>
                          {views || "Mangler data"}
                        </Table.DataCell>
                        <Table.DataCell>
                          {(scrollLength && scrollLength + "%") ||
                            "Mangler data"}
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
    </div>
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
