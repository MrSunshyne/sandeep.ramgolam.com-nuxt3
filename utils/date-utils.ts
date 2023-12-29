// function to get the current month in words from a date
export const getMonthInWords = (date: Date) => {
  const month = date.getMonth();
  const monthInWords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthInWords[month];
};

export const dateFormat = (date?: Date | undefined, format: string = "date") => {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const Month = getMonthInWords(date);
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();
  const dateStr = `${day} ${Month} ${year}`;
  const timeStr = `${hour}:${minute}:${second}.${millisecond}`;
  const dateAndTimeStr = `${dateStr} ${timeStr}`;
  if (format === "date") {
    return dateStr;
  } else if (format === "time") {
    return timeStr;
  } else if (format === "monthAndYear") {
    return `${Month} ${year}`;
  } else if (format === "dateAndTime") {
    return dateAndTimeStr;
  }
  return date;
};
