import { Hide, Show, HGrid } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import cl from "clsx";

const Example = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="4">
      <Show below="md">
        <Placeholder mobil text="Synlig bare på mobil" />
      </Show>
      <Placeholder text="Alltid synlig" />
      <Hide below="md">
        <Placeholder desktop text="Synlig bare på Desktop" />
      </Hide>
    </HGrid>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Vi anbelfaler konsistent bruk av 'above' og 'below' for bedre lesbarhet.",
};

export const args = {
  index: 2,
  desc: "Prøv å endre størrelse på nettleservindu",
};

const Placeholder = ({
  text,
  noPadding,
  mobil,
  desktop,
}: {
  text?: string;
  noPadding?: boolean;
  mobil?: boolean;
  desktop?: boolean;
}) => {
  return (
    <div
      className={cl(
        "min-h-48 text-text-on-action grid h-auto w-auto place-content-center rounded p-2",
        {
          "bg-pink-600": mobil,
          "bg-violet-600": desktop,
          "bg-teal-600": !desktop && !mobil,
        }
      )}
      style={{ padding: noPadding && 0 }}
    >
      {text}
    </div>
  );
};
