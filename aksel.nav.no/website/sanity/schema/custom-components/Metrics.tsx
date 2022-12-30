import { Heading, Stack } from "@sanity/ui";
import { getWeek } from "date-fns";
import {
  CartesianGrid,
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

  const parsedWeeks = weeks.map((week: any) => {
    return {
      week: getWeek(new Date(week.week)),
      views: week.views,
      scrollLength: week.scrollLength,
    };
  });

  return (
    <Stack>
      <Heading as="h2" size={1}>
        Metrikker
      </Heading>
      <p>
        <>Totale sidevisninger: {totalViews}</>
      </p>
      <p>Totale uker: {weeks.length}</p>
      <p>
        <>Gjennomsnitt scrolllengde: {avgScrollLength}%</>
      </p>
      <p>
        <>Gjennomsnitt tid på siden: {avgTime} sekunder</>
      </p>
      <p>
        <>Totale inaktive: {inactiveCount}</>
      </p>
      {weeks && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={parsedWeeks}>
            <CartesianGrid />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="scrollLength" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Stack>
  );
};

export default Metrics;
