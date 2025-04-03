"use client";

import { usePathname, useRouter } from "next/navigation";
import { BulletListIcon, Density1Icon } from "@navikt/aksel-icons";
import { ToggleGroup } from "@navikt/ds-react";

function OverviewPageToggle({ value }: { value: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams();
    params.set("sort", newValue);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <ToggleGroup
      defaultValue={value}
      onChange={handleChange}
      size="small"
      variant="neutral"
    >
      <ToggleGroup.Item
        value="grid"
        label="Rutenett"
        icon={<Density1Icon aria-hidden />}
      />
      <ToggleGroup.Item
        value="list"
        label="Liste"
        icon={<BulletListIcon aria-hidden />}
      />
    </ToggleGroup>
  );
}

export { OverviewPageToggle };
