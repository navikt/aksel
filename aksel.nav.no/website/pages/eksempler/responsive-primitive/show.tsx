import { Show, HGrid } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import cl from "clsx";

const Example = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="4">
      <Placeholder text="Alltid synlig" />
      <Show above="md">
        <Placeholder desktop text="Synlig bare på desktop" />
      </Show>
    </HGrid>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
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
        "min-h-48 text-text-on-action grid h-auto w-auto place-content-center rounded bg-teal-600 p-2",
        { "bg-pink-600": mobil, "bg-violet-600": desktop }
      )}
      style={{ padding: noPadding && 0 }}
    >
      {text}
    </div>
  );
};
