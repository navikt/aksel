import { useRouter } from "next/router";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const router = useRouter();

  return (
    <ActionMenu defaultOpen>
      <ActionMenu.Trigger>
        <Button>Open</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="See code for implementation">
          <ActionMenu.Item onSelect={() => window.open("#")}>
            With Window.open
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={() => router.push("#")}>
            Nextjs Pages router
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.log}>
            Nextjs App router (see commented code)
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.log}>
            React router (see commented code)
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.log}>
            Remix (see commented code)
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

/*

'use client'
import { useRouter } from 'next/navigation'
const NextjsAppDirExample = () => {
    const router = useRouter();
    ...
    <ActionMenu.Item onSelect={() => router.push("#")}>
        Nextjs App router
    </ActionMenu.Item>
}

import { useNavigate } from 'react-router-dom';
const ReactRouterExample = () => {
  const navigate = useNavigate();
  ...
  <ActionMenu.Item onSelect={() => navigate("#")}>
      React Router
  </ActionMenu.Item>
}

import { useNavigate } from "@remix-run/react";
const ReactRouterExample = () => {
  const navigate = useNavigate();
  ...
  <ActionMenu.Item onSelect={() => navigate("#")}>
      Remix
  </ActionMenu.Item>
}

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
