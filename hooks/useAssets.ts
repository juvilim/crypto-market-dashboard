import { useQuery } from "react-query";
import { fetchWrapper } from "../utils";

interface CryptoCurrencyAsset {
  name: string;
  fullName: string;
  logo: string;
  symbol: string;
  price: number;
  tags: string[];
}

interface Response {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: CryptoCurrencyAsset[];
}

const fetchAssets = async () => {
  return await fetchWrapper<Response>(
    "https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list"
  );
};

export const useAssets = (queryKeys: Record<string, any>) =>
  useQuery(["symbolList", queryKeys], fetchAssets);
