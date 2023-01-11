import { Card, Text } from "@sanity/ui";
import { differenceInMonths } from "date-fns";
import { FieldProps, useFormValue } from "sanity";

export function UpdateInfo(props: FieldProps) {
  const { ...restProps } = props;

  const verified: any = useFormValue(["updateInfo", "lastVerified"]);
  if (!verified) {
    return null;
  }
  const diff = differenceInMonths(new Date(), new Date(verified));
  const outDated = diff >= 6;
  if (!outDated) {
    return null;
  }

  return (
    <Card>
      <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
        <Text align="center" size={[2, 2, 3]}>
          Artikkelen er over 6 mnd gammel og trenger ny godkjenning!
        </Text>
      </Card>
      <div className="mt-4">{props.renderDefault(restProps)}</div>
    </Card>
  );
}
