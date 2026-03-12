import { CurrencyCode } from "@/constant";

const currencyLocaleMap: Record<CurrencyCode, string> = {
  NGN: "en-NG",
  GBP: "en-GB",
  USD: "en-US",
  EUR: "de-DE",
};

const formatCurrency = (amount: number, currency: CurrencyCode) => {
  const locale = currencyLocaleMap[currency];

  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default formatCurrency;
