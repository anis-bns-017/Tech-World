const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
  })

  return formatter.format(num);
};

export default displayCurrency;