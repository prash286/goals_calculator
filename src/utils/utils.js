function formatInvestPerAmount(amt, fraction = 0) {
  if (amt && !isNaN(Number(amt))) {
    if (Number(amt) < 10000) {
      let valueBeforeDecimal = String(amt).split(".")[0];
      let valueAfterDecimal = String(amt).split(".")[1];

      const formattedValue = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: fraction,
      }).format(Number(valueBeforeDecimal.replace(/[^0-9]/g, "")));
      return formattedValue + "." + valueAfterDecimal;
    } else {
      return shortCurrencyLength(amt);
    }
  }
}

function shortCurrencyLength(amount, divideBy10000 = false) {
  let numericValue = parseFloat(amount.replace(/[^\d.]/g, ""));
  if (divideBy10000 && numericValue / 10000 >= 1) {
    let kValue = (numericValue / 10000).toFixed(2) + " K";
    return kValue;
  } else {
    let kValue = (numericValue / 1000).toFixed(2) + " K";
    return kValue;
  }
}

function formatAmount(amt, fraction) {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: fraction,
  }).format(Number(amt.replace(/[^0-9]/g, "")));
  return formattedValue;
}

function calculateBillexClubAndNormalEarnings(goalAmount, goalTimeline) {
  const T = goalTimeline / 12;
  const SI = (Number(goalAmount) * 14 * T) / 100;
  const billexClubEarnings = Number(goalAmount) + SI;
  const normalEarnings = Number(goalAmount) * T;
  return { billexClubEarnings, normalEarnings, interestEarn: SI?.toFixed(1) };
}

export {
  formatAmount,
  formatInvestPerAmount,
  shortCurrencyLength,
  calculateBillexClubAndNormalEarnings,
};
