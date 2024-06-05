import { List } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <List as="ul" title="Det kan også være aktuelt hvis du:">
      <List.Item>
        står i fare for å miste jobben etter å ha vært sykmeldt helt eller
        delvis i 12 måneder, eller
      </List.Item>
      <List.Item>
        har full eller gradert uføretrygd, men ønsker å jobbe. NAV må ha vurdert
        om andre arbeidsmarkedstiltak og virkemidler er aktuelle.
      </List.Item>
      <List.Item>
        er en arbeidssøker med varig og vesentlig nedsatt arbeidsevne som kan
        bli ansatt i en vanlig jobb.
      </List.Item>
    </List>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "<List> wrapper <ul> og <List.Item> wrapper <li>. Husk å sette riktig 'headingTag' hvis du bruker 'title'.",
};
