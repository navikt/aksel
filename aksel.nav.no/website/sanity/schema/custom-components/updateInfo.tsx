import { Card, Stack, Text } from "@sanity/ui";
import { differenceInDays } from "date-fns";
import { StringFieldProps } from "sanity";

export function UpdateInfo(props: StringFieldProps) {
  const testDate = new Date("Nov 10 2022");

  const content =
    differenceInDays(new Date(), testDate) < 100
      ? { tone: "positive", message: "Article is recently updated" }
      : {
          tone: "critical",
          message:
            "Articlehas not been updated in more than 100 days, might be outdated...",
        };

  return (
    <Stack space={3}>
      <Card
        padding={[3, 3, 4]}
        radius={2}
        shadow={1}
        tone={content.tone === "positive" ? "positive" : "critical"}
      >
        <Text align="center" size={[2, 2, 3]}>
          {content.message}
        </Text>
      </Card>
    </Stack>
  );
}
