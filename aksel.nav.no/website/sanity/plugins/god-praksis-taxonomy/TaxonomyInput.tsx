// MediaTipInput.tsx
import { SanityDocument, set, useFormValue } from "sanity";
import { useListeningQuery } from "sanity-plugin-utils";
import { Chips, Label, VStack } from "@navikt/ds-react";

export function TaxonomyInput(props) {
  const innholdstype = useFormValue(["gp_taxonomy", "innholdstype"]) as {
    _ref: string;
  } | null;

  const { data: innholdstyper } = useListeningQuery<SanityDocument[]>(
    `*[_type == $type]`,
    {
      params: { type: "gp.innholdstype" },
      initialValue: [],
    },
  );

  console.log(props);

  return (
    <VStack gap="4">
      {innholdstyper?.length > 0 && (
        <VStack gap="2">
          <Label as="p" size="small">
            Innholdstype
          </Label>
          <Chips>
            {innholdstyper.map((type) => (
              <Chips.Toggle
                selected={innholdstype?._ref === type._id}
                onClick={() => {
                  props.onChange(
                    set({ _ref: type._id, _type: "reference" }, [
                      "innholdstype",
                    ]),
                  );
                }}
                checkmark={false}
                variant="neutral"
                key={type._id}
              >
                {(type?.title as string) ?? ""}
              </Chips.Toggle>
            ))}
          </Chips>
        </VStack>
      )}
    </VStack>
  );
}
