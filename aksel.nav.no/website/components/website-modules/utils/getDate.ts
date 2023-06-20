import { dateStr } from "components/website-modules/utils/date-string";
import { useEffect, useState } from "react";

export const useFormatedDate = (date: string) => {
  const [_date, setDate] = useState(null);

  useEffect(() => {
    const handleDate = async () => setDate(await dateStr(date));
    handleDate();
  }, [date]);
  return _date;
};
