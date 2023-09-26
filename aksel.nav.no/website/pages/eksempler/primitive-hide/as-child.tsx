import { Hide, HGrid } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import cl from "clsx";

const Example = () => {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap="4">
      <Hide above="md" asChild>
        <Placeholder mobil text="Synlig bare på mobil" />
      </Hide>
      <Placeholder text="Alltid synlig" />
    </HGrid>
  );
};

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Vi anbefaler å bruke 'asChild'-prop der mulig. Dette reduserer dom-noder og forenkler output. For at Hide + child-komponent skal fungere må child kunne ta inn 'className' som prop.",
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
