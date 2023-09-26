import { List, ShowMore } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: 450, maxWidth: 600 }}>
      <ShowMore heading="Fakta om rødreven">
        <List>
          <List.Item>
            Rødreven varierer i størrelse og utseende avhengig av hvor den
            lever.
          </List.Item>
          <List.Item>
            Den er den største arten i slekten Vulpes og betydelig større enn
            andre arter.
          </List.Item>
          <List.Item>
            Rødrevens farge varierer, men typisk har den rød rygg, hvit hals og
            buk, med svarte føtter og svart på baksiden av ørene.
          </List.Item>
          <List.Item>
            Det finnes mørkere fargevarianter som korsrev og svartrev, samt
            mutasjonen sølvrev.
          </List.Item>
          <List.Item>
            Størrelsen varierer mellom kjønn og geografisk område, med hannene
            som er større enn hunnene.
          </List.Item>
          <List.Item>
            Rødreven er et mellomstort rovdyr som konkurrerer med andre
            mellomstore rovpattedyr som prærieulv og sjakal.
          </List.Item>
        </List>
      </ShowMore>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
