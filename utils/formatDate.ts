export default (date: Date) => {
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    string: `${formattedDate} às ${formattedTime}`,
    date: formattedDate,
    time: formattedTime,
  };
};
