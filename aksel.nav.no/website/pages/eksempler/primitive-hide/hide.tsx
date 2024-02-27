import cl from "clsx";
import { HGrid, Hide } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HGrid columns="1" gap="4">
      <Hide above="md" asChild>
        <Placeholder mobil text="Synlig bare på mobil" />
      </Hide>
      <Placeholder text="Alltid synlig" />
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
  index: 0,
  desc: "Endre størrelse på nettleservindu for å se komponent i aksjon",
  sandbox: false,
};
