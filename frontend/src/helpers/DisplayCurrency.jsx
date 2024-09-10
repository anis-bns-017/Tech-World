const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 0,
  });

  // Manually add the Taka symbol before the formatted number
  return `${formatter.format(num)}৳`;
};

export default displayCurrency;
