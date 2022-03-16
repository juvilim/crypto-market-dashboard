export const fetchWrapper = async <RetvalType = Response>(
  input: RequestInfo,
  init?: RequestInit
) => {
  const response = await fetch(input, init);

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson as RetvalType;
};

export const hasKeyword = (values: string[], keyword: string) => {
  return values.some(
    (value) => value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
  );
};

const currencyFormatOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 8,
};
let currencyFormatter: Intl.NumberFormat | undefined = undefined;

export const currencyFormat = (value: number) => {
  if (!currencyFormatter) {
    currencyFormatter = new Intl.NumberFormat("en", currencyFormatOptions);
  }
  return currencyFormatter.format(value);
};

const numberFormatOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
};
let numberFormatter: Intl.NumberFormat | undefined = undefined;

const numberFormat = (value: number) => {
  if (!numberFormatter) {
    numberFormatter = new Intl.NumberFormat("en", numberFormatOptions);
  }
  return numberFormatter.format(value);
};

export const toMillionFormat = (number: any) => {
  if (number < Math.pow(10, 6)) {
    return numberFormat(number);
  }

  return numberFormat(number / Math.pow(10, 6)) + "M";
};
