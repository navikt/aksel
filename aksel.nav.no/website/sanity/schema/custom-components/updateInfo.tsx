import { Card, Stack, Text } from "@sanity/ui";
import { differenceInDays } from "date-fns";
import { StringFieldProps } from "sanity";

type Status = "positive" | "critical" | "caution";

export function UpdateInfo(props: StringFieldProps) {
  const testDate = new Date("Feb 10 2022");
  const diff = differenceInDays(new Date(), testDate);
  const status: Status =
    diff > 365
      ? "critical"
      : diff > 150 && diff <= 365
      ? "caution"
      : "positive";

  const messages = {
    positive: "Article has recently been updated",
    caution: "Article has not been updated or verified in more than 150 days",
    critical: "Article ha not been updated or verified in more than a year.",
  };

  return (
    <Stack space={3}>
      <Card padding={[3, 3, 4]} radius={2} shadow={1} tone={status}>
        <Text align="center" size={[2, 2, 3]}>
          {messages[status]}
        </Text>
      </Card>
    </Stack>
  );
}
