import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { Chips, HGrid, Label } from "@navikt/ds-react";
import { useGpPageContext } from "@/layout/god-praksis-page/context";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
};

function ChipNav({ type }: ChipsNavProps) {
  const id = useId();
  const ctx = useGpPageContext();

  const { query, replace } = useRouter();

  if (
    type == "undertema" &&
    (ctx.type === "frontpage" ||
      (ctx.type === "tema-page" && !(ctx.tema?.undertema?.length > 0)))
  ) {
    return null;
  }

  if (type == "innholdstype" && !(ctx.innholdstype?.length > 0)) {
    return null;
  }

  function handleSelect(title: string) {
    query[type] === title
      ? replace({ query: omit(query, [type]) }, undefined)
      : replace({ query: { ...query, [type]: title } });
  }

  const options =
    type === "innholdstype"
      ? ctx.innholdstype.map((t) => t.title)
      : ctx.type === "tema-page"
      ? ctx.tema.undertema.map((undertema) => undertema.title)
      : [];

  return (
    <HGrid gap="2" columns={{ sm: 1, md: "auto 1fr" }} align="center">
      <Label as="p" className="text-aksel-heading">
        {`${capitalize(type)}`}
      </Label>

      <div className="relative overflow-hidden">
        <ScrollFade wrapperId={id} />
        <ul
          id={id}
          className={cl("overflow-x-scroll flex gap-2 p-1", styles.chips)}
        >
          {options.map((option) => (
            <li key={option}>
              <Chips.Toggle
                variant="neutral"
                checkmark={false}
                selected={encodeURIComponent(option) === query?.[type]}
                onClick={() => handleSelect(encodeURIComponent(option))}
              >
                {option}
              </Chips.Toggle>
            </li>
          ))}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
