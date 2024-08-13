import Link from "next/link";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ActionMenu defaultOpen>
      <ActionMenu.Trigger>
        <Button>Open</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="See code for implementation">
          <ActionMenu.Item as="a" href="#">
            With Window.open
          </ActionMenu.Item>
          <Link href="#123" passHref legacyBehavior>
            <ActionMenu.Item as="a">Nextjs Pages router</ActionMenu.Item>
          </Link>
          <ActionMenu.Item>
            Nextjs App router (see commented code)
          </ActionMenu.Item>
          <ActionMenu.Item>React router (see commented code)</ActionMenu.Item>
          <ActionMenu.Item>Remix (see commented code)</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

/*

import { Link as ReactRouterLink } from "react-router-dom";
const ReactRouterExample = () => {
  const navigate = useNavigate();
  ...
  <ActionMenu.Item as={ReactRouterLink} to="#">
      React Router
  </ActionMenu.Item>
}

import { Link as RemixLink } from "@remix-run/react";
const RemixExample = () => (
  <ActionMenu.Item as={RemixLink} to="#">
      React Router
  </ActionMenu.Item>
);

*/

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "Alle events sendes gjennom 'onSelect'-callback. Du vil manuelt måtte håndtere routing hvis handlingen er en lenke. Se kode og kommentarer for hvordan dette kan løses i ulike rammeverk.",
};
