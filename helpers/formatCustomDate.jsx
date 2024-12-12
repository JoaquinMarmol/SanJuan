import { parseISO, format } from 'date-fns';

export default function formatCustomDate(isoDateString, id) {
  const date = parseISO(isoDateString);
  return format(date, "EEEE, MMMM do");
}

