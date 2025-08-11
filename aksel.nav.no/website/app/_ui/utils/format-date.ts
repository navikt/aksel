import { format } from "date-fns";
import { nb } from "date-fns/locale";

/**
 * Formats a date string into a more readable format.
 *
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string in the format "d. MMMM yyy".
 */
function formatDateString(date?: string): string {
  if (!date) {
    return "";
  }

  return format(new Date(date), "d. MMMM yyy", { locale: nb });
}

export { formatDateString };
