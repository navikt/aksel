import cl from "clsx";
import { HGrid, Hide, Show } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

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
  mobil,
  desktop,
  className,
}: {
  text?: string;
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
  index: 1,
  desc: "Vi anbelfaler konsistent bruk av 'above' og 'below' for bedre lesbarhet.",
  sandbox: false,
};
