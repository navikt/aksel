import { ExternalLinkIcon, MenuGridIcon } from "@navikt/aksel-icons";
import { Dropdown, InternalHeader, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "14rem" }}>
      <InternalHeader>
        <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
        <Spacer />
        <Dropdown defaultOpen>
          <InternalHeader.Button as={Dropdown.Toggle}>
            <MenuGridIcon
              style={{ fontSize: "1.5rem" }}
              title="Systemer og oppslagsverk"
            />
          </InternalHeader.Button>

          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              <Dropdown.Menu.GroupedList.Heading>
                Systemer og oppslagsverk
              </Dropdown.Menu.GroupedList.Heading>
              <Dropdown.Menu.GroupedList.Item as="a" target="_blank" href="#">
                A.Inntekt <ExternalLinkIcon aria-hidden />
              </Dropdown.Menu.GroupedList.Item>
              <Dropdown.Menu.GroupedList.Item as="a" target="_blank" href="#">
                Aa-registeret <ExternalLinkIcon aria-hidden />
              </Dropdown.Menu.GroupedList.Item>
              <Dropdown.Menu.GroupedList.Item as="a" target="_blank" href="#">
                Gosys <ExternalLinkIcon aria-hidden />
              </Dropdown.Menu.GroupedList.Item>
              <Dropdown.Menu.GroupedList.Item as="a" target="_blank" href="#">
                Modia personoversikt <ExternalLinkIcon aria-hidden />
              </Dropdown.Menu.GroupedList.Item>
              <Dropdown.Menu.GroupedList.Item as="a" target="_blank" href="#">
                Oppdrag <ExternalLinkIcon aria-hidden />
              </Dropdown.Menu.GroupedList.Item>
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
        <InternalHeader.User name="Ola Normann" />
      </InternalHeader>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 4,
  title: "App-meny",
  desc: "App-menyen inneholder lenker til andre interne systemer.",
};
