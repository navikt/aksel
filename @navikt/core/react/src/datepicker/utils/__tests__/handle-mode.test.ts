import { getInitialSelected } from "../handle-mode";

describe("Returns initial selected state", () => {
  test("Should return date (Aug 17 2022)", () => {
    const disabled = [];
    const disableWeekends = false;
    expect(
      getInitialSelected("single", disabled, disableWeekends)
    ).toBeInstanceOf(Date);
  });
});
