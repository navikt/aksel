import { getInitialSelected } from "../handle-mode";
import { isWeekend } from "date-fns";

describe("Returns initial selected state", () => {
  test("Date should be valid (Date)", () => {
    const disabled = [];
    const disableWeekends = false;
    expect(
      getInitialSelected("single", disabled, disableWeekends)
    ).toBeInstanceOf(Date);
  });
  test("Date should be disabled (undefined)", () => {
    const disabled = [new Date()];
    const disableWeekends = false;
    expect(
      getInitialSelected("single", disabled, disableWeekends)
    ).toBeUndefined();
  });
  test("Date should be disabled if today is weekend (Date | undefined)", () => {
    const disabled = [];
    const disableWeekends = true;
    if (isWeekend(new Date())) {
      expect(
        getInitialSelected("single", disabled, disableWeekends)
      ).toBeUndefined();
    } else {
      expect(
        getInitialSelected("single", disabled, disableWeekends)
      ).toBeInstanceOf(Date);
    }
  });
});
