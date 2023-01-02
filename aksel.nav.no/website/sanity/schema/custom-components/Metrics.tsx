import { Heading, Stack } from "@sanity/ui";
import { getWeek } from "date-fns";
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
      week: getWeek(new Date(week.week)),
      views: week.views,
      Sidevisninger: week.views,
      Scroll: week.scrollLength,
      scrollLength: week.scrollLength,
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
      <p>
        <>Totale sidevisninger: {totalViews}</>
      </p>
      <p>Totale uker: {weeks?.length}</p>
      <p>
        <>Gjennomsnitt scrolllengde: {avgScrollLength}%</>
      </p>
      <p>
        <>Gjennomsnitt tid på siden: {parseTime(Number(avgTime))}</>
      </p>
      <p>
        <>Totale inaktive: {inactiveCount}</>
      </p>
      {weeks && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={500} height={300} data={parsedWeeks}>
            <XAxis dataKey="week" />
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
      )}
    </Stack>
  );
};

export default Metrics;
