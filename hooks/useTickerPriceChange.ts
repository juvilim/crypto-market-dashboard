import { useQuery } from "react-query";
import { DEFAULT_REFETCH_INTERVAL } from "../constants";
import { fetchWrapper } from "../utils";

interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  volume: string;
}

const fetchTickerPriceChange = async () => {
  return await fetchWrapper<Ticker[]>(
    "https://api.binance.com/api/v3/ticker/24hr"
  );
};

export const useTickerPriceChange = (assets?: string[]) =>
  useQuery(["tickers", assets], fetchTickerPriceChange, {
    enabled: Boolean(assets?.length),
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    keepPreviousData: true,
  });
