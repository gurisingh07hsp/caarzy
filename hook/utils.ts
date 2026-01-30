export const capitalizeString = (str: string) => {
      return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

export const PriceFormatter = (amount: any) => {
    if (!amount || isNaN(amount)) return '';

  if (amount >= 10000000) {
    return (amount / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
  }

  if (amount >= 100000) {
    return (amount / 100000).toFixed(2).replace(/\.00$/, '') + ' L';
  }

  return amount.toLocaleString('en-IN');
}