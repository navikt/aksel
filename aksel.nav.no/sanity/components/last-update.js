import { Button, Card, Inline, Stack, Text } from "@sanity/ui";
import moment from "moment";
import PatchEvent, { set } from "part:@sanity/form-builder/patch-event";
import React from "react";

const CustomDisplay = React.forwardRef((props, ref) => {
  const click = () => {
    props.onChange &&
      props.onChange(
        PatchEvent.from(set(new Date().toISOString().split("T")[0]))
      );
  };

  const lastUpdate = moment(props.value);
  const daysSince = moment().diff(lastUpdate, "days");

  return (
    <Stack tabIndex={0} space={4} ref={ref}>
      {daysSince > 90 && (
        <Card
          padding={[3, 3, 4]}
          radius={2}
          shadow={1}
          tone={daysSince > 180 ? "critical" : "caution"}
        >
          <Text align="center" size={[2, 2, 3]}>
            {daysSince > 180
              ? "Innholdet er utdatert!"
              : "Innholdet er stagnert!"}
          </Text>
        </Card>
      )}
      <Stack space={4}>
        <Text size={1} weight="semibold">
          Sist oppdatert
        </Text>
        <Text size={2}>{props.value?.split("-").reverse().join("/")}</Text>
      </Stack>

      <Inline space={[3, 3, 4]}>
        <Button
          onClick={() => click()}
          fontSize={[2]}
          mode="ghost"
          padding={[2, 2]}
          text="Oppdater"
        />
      </Inline>
    </Stack>
  );
});

export default CustomDisplay;
