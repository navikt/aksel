import { useEffect, useState } from "react";
import { dateStr } from "@/utils";

export const useFormatedDate = (date?: string) => {
  const [_date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;
    const handleDate = async () => setDate(await dateStr(date));
    handleDate();
  }, [date]);

  return _date;
};
