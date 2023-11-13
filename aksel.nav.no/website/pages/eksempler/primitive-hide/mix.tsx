import { withDsExample } from "@/web/examples/withDsExample";
import { HGrid, Hide, Show } from "@navikt/ds-react";
import cl from "clsx";

const Example = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="4">
      <Show below="md" asChild>
        <Placeholder mobil text="Synlig bare på mobil" />
      </Show>
      <Placeholder text="Alltid synlig" />
      <Hide below="md" asChild>
        <Placeholder desktop text="Synlig bare på Desktop" />
      </Hide>
    </HGrid>
  );
};

const Placeholder = ({
  text,
  noPadding,
  mobil,
  desktop,
  className,
}: {
  text?: string;
  noPadding?: boolean;
  mobil?: boolean;
  desktop?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cl(
        "min-h-24 text-text-on-action grid aspect-video h-auto w-auto place-content-center rounded p-2",
        className,
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

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Vi anbelfaler konsistent bruk av 'above' og 'below' for bedre lesbarhet.",
  sandbox: false,
};
