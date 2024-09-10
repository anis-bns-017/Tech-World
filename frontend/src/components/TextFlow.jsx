const TextFlow = () => {
  const getFormattedDate = () => {
    const today = new Date();

    // Get the day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[today.getDay()];

    // Get the day of the month
    const day = today.getDate();

    // Get the suffix for the day
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Covers 11th-19th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Get the month name
    const monthsOfYear = [
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
    const monthName = monthsOfYear[today.getMonth()];

    return `${day}${getDaySuffix(day)} ${monthName} ${dayName}`;
  };

  return (
    <>
      <div className="px-10">
        <div className="text-wrapper rounded-full p-4">
          <p>
            {`${getFormattedDate()}, all our outlets are open. Additionally, our online activities are open and operational.`}
          </p>
        </div>
      </div>
    </>
  );
};

export default TextFlow;
