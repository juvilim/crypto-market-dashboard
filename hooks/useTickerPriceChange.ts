import { useQuery } from "react-query";
import { DEFAULT_REFETCH_INTERVAL } from "../constants";
import { fetchWrapper } from "../utils";

export interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  volume: string;
}

type Response = Ticker;

const fetchTickerPriceChange = async (tradingPair: string) => {
  console.log("fetchTickerPriceChange", tradingPair);
  let queryParam = "";
  if (tradingPair) queryParam = `?symbol=${tradingPair}`;

  return await fetchWrapper<Response>(
    `https://api.binance.com/api/v3/ticker/24hr${queryParam}`
  );
};

export const useTickerPriceChange = (tradingPair: any) =>
  useQuery(["ticker", tradingPair], () => fetchTickerPriceChange(tradingPair), {
    enabled: Boolean(tradingPair),
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    keepPreviousData: false,
  });
