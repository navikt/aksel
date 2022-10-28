import { SanityT } from "@/lib";

const TwoBeforeOne = 1;
const OneBeforeTwo = -1;

export function compare(
  one: SanityT.Schema.ds_color,
  two: SanityT.Schema.ds_color
): number {
  if (one.color_index === undefined && two.color_index === undefined) {
    return one.title?.localeCompare(two.title, "no", { numeric: true });
  }
  if (one.color_index === undefined) {
    return TwoBeforeOne;
  }
  if (two.color_index === undefined) {
    return OneBeforeTwo;
  }
  if (one.color_index === two.color_index) {
    return one.title?.localeCompare(two.title, "no", { numeric: true });
  }
  return one.color_index > two.color_index ? TwoBeforeOne : OneBeforeTwo;
}
