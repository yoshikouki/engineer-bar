export const toYMD = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
};

export const toHM = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date);
};

export const toRelativeDate = (date: Date): string => {
  const formatter = new Intl.RelativeTimeFormat("ja-JP", {
    numeric: "auto",
  });
  const diff = date.getTime() - new Date().getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return formatter.format(diffDays, "day");
};
