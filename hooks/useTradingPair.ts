import { useQuery } from "react-query";
import { fetchWrapper } from "../utils";

export interface TradingPair {
  symbol: string;
  alias: string;
  symbolPair: string;
  marketCap: number;
}

interface Response {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: TradingPair[];
}

const fetchTradingPair = async (code: string) => {
  let queryParam = "";
  if (code) queryParam = `?symbol=${code}`;

  return await fetchWrapper<Response>(
    `https://www.binance.com/bapi/composite/v1/public/marketing/tardingPair/detail${queryParam}`
  );
};

export const useTradingPair = (code: any) =>
  useQuery(["tradingPair", code], () => fetchTradingPair(code), {
    enabled: Boolean(code),
  });
