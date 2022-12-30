import { Heading, Stack } from "@sanity/ui";
import { useFormValue } from "sanity";

export const Metrics = () => {
  const totalViews = useFormValue(["metrics", "pageviews", "summary"]);
  const weeks: any = useFormValue(["metrics", "pageviews", "weeks"]);
  const avgScrollLength = useFormValue(["metrics", "avgScrollLength"]);
  const avgTime = useFormValue(["metrics", "avgTime"]);
  const inactiveCount = useFormValue(["metrics", "inactiveCount"]);

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
    </Stack>
  );
};

export default Metrics;
