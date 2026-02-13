import { List } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <List as="ul">
      <List.Item>
        står i fare for å miste jobben etter å ha vært sykmeldt helt eller
        delvis i 12 måneder,
      </List.Item>
      <List.Item>
        har full eller gradert uføretrygd, men ønsker å jobbe. Nav må ha vurdert
        om andre arbeidsmarkedstiltak og virkemidler er aktuelle, eller
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
  desc: "<List> rendrer en <ul> og <List.Item> rendrer en <li>.",
};
