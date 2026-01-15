import Link from "next/link";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Se kode for implementasjon">
          <ActionMenu.Item as="a" href="/eksempel">
            Vanlig lenke
          </ActionMenu.Item>
          <Link href="/eksempel" passHref legacyBehavior>
            <ActionMenu.Item as="a">Next.js-lenke</ActionMenu.Item>
          </Link>
          <ActionMenu.Item>React router (se kommentert kode)</ActionMenu.Item>
          <ActionMenu.Item>Remix (se kommentert kode)</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

/*

import { Link as ReactRouterLink } from "react-router";
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
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  sandbox: false,
};
