import cl from "clsx";
import { HGrid, Show } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="4">
      <Placeholder text="Alltid synlig" />
      <Show above="md" asChild>
        <Placeholder desktop text="Synlig bare på desktop" />
      </Show>
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
        "grid aspect-video h-auto min-h-24 w-auto place-content-center rounded p-2 text-text-on-action",
        className,
        {
          "bg-pink-600": mobil,
          "bg-violet-600": desktop,
          "bg-teal-600": !desktop && !mobil,
        },
      )}
      style={{ padding: noPadding && 0 }}
    >
      {text}
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Vi anbefaler å bruke 'asChild'-prop der mulig. Dette reduserer dom-noder og forenkler output. For at Show + child-komponent skal fungere må child kunne ta inn 'className' og 'style' som prop.",
  sandbox: false,
};
