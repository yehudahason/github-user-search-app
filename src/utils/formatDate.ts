export function formatDate(str: string | null) {
  if (!str) return "";
  const date = new Date(str);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
