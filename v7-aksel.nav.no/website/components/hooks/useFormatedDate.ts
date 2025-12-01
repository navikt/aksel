import { useEffect, useState } from "react";
import { formatDateString } from "@/app/_ui/utils/format-date";

export const useFormatedDate = (date?: string) => {
  const [_date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;
    const handleDate = async () => setDate(formatDateString(date));
    handleDate();
  }, [date]);

  return _date;
};
