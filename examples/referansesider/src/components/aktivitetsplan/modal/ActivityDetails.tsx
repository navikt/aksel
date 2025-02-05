import { BodyShort, HGrid, Heading } from "@navikt/ds-react";
import { Activity } from "../../../data/activities";

const mapActivityDetails = (
  activity: Activity,
): { title?: string; value?: string; span?: number }[] => {
  switch (activity.category) {
    case "Stilling fra Nav":
      return [
        { value: activity.description, span: 2 },
        { title: "Arbeidsgiver", value: activity.employer },
        { title: "Arbeidssted", value: activity.location },
      ];
    case "Behandling":
      return [
        { title: "Type behandling", value: activity.treatmentType },
        { title: "Behandlingssted", value: activity.location },
        { title: "Fra dato", value: activity.date?.start },
        { title: "Til dato", value: activity.date?.end },
        { title: "Mål for behandlingen", value: activity.goal },
        { title: "Beskrivelse", value: activity.description, span: 2 },
      ];
    case "Møte med Nav":
      return [
        {
          title: "Planlegger / Møte med Nav",
          value: activity.description,
          span: 2,
        },
        {
          title: "Dato",
          value: activity.date?.start,
        },
        {
          title: "Klokkeslett",
          value: activity.time,
        },
        { title: "Møteform", value: activity.meetingForm },
        { title: "Varighet", value: activity.length },
        {
          title: "Møtested eller annen praktisk informasjon",
          value: activity.location,
        },
        { title: "Hensikt med møtet", value: activity.description, span: 2 },
      ];
    default:
      return [];
  }
};

const ActivityDetails = ({ activity }: { activity: Activity }) => {
  const details = mapActivityDetails(activity);
  return (
    <HGrid columns="1fr 1fr" gap="4">
      {details.map(({ title, span, value }) => (
        <div
          key={title}
          style={span ? { gridColumnStart: `span ${span}` } : undefined}
        >
          {title && (
            <Heading size="xsmall" as="h2">
              {title}
            </Heading>
          )}
          <BodyShort>{value}</BodyShort>
        </div>
      ))}
    </HGrid>
  );
};

export default ActivityDetails;
