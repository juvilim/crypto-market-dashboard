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
  minimumFractionDigits: 5,
};
let currencyFormatter: Intl.NumberFormat | undefined = undefined;

export const currencyFormat = (value: number) => {
  if (!currencyFormatter) {
    currencyFormatter = new Intl.NumberFormat("en", currencyFormatOptions);
  }
  return currencyFormatter.format(value);
};

const abbreviateNumber = (number: any, decimalPlaces: number) => {
  decimalPlaces = Math.pow(10, decimalPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (var i = abbrev.length - 1; i >= 0; i--) {
    let size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decimalPlaces) / size) / decimalPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];
      break;
    }
  }

  return number;
};

export const bigNumberFormat = (value: number) => abbreviateNumber(value, 2);
