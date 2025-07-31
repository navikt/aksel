import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import { Chips, Label, VStack } from "@navikt/ds-react";
import { capitalizeText } from "@/ui-utils/format-text";

export default function FilterGroup({
  type,
  options,
  selectedOption,
  label,
}: {
  type: "category" | "period";
  options: string[];
  selectedOption: string | null;
  label: string;
}) {
  const { push, prefetch } = useRouter();

  const [optimistic, expect] = useOptimistic(
    selectedOption,
    (_, optimisticValue: string | null) => optimisticValue,
  );

  const pathname = usePathname();
  const searchParams = useSearchParams()?.toString();
  function getHref(option: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (type === "period") {
      params.set("periode", `${option === optimistic ? "alle" : option}`);
    } else if (type === "category") {
      if (option === optimistic) {
        params.delete("kategori");
      } else {
        params.set("kategori", option);
      }
    }
    return `${pathname}?${params.toString()}`;
  }
  return (
    <VStack gap="space-8">
      <Label as="div">{label}</Label>
      <Chips>
        {options.map((option) => {
          const href = getHref(option);
          return (
            <Chips.Toggle
              key={option}
              selected={selectedOption === option}
              checkmark={false}
              variant="neutral"
              onMouseEnter={() => {
                prefetch(href);
              }}
              onClick={() => {
                if (typeof option === "number") {
                  startTransition(() => expect(option));
                } else {
                  startTransition(() => expect(option));
                }
                push(href, { scroll: false });
              }}
            >
              {capitalizeText(option.toString())}
            </Chips.Toggle>
          );
        })}
      </Chips>
    </VStack>
  );
}
