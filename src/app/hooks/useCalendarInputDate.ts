export const useCalendarInputDate = () => {
  const formatDate = (date: Date | string, includeTime = true) => {
    const initial = date instanceof Date ? date : new Date(date);

    if (isNaN(initial.getTime())) return "Некорректная дата";

    const dd = String(initial.getDate()).padStart(2, "0");
    const mm = String(initial.getMonth() + 1).padStart(2, "0");
    const yyyy = String(initial.getFullYear());

    const hours = String(initial.getHours()).padStart(2, "0");
    const minutes = String(initial.getMinutes()).padStart(2, "0");

    return includeTime
      ? `${dd}.${mm}.${yyyy} ${hours}:${minutes}`
      : `${dd}.${mm}.${yyyy}`;
  };

  return { formatDate };
};
