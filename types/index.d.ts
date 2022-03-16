export interface SortingRule {
  sortBy: string;
  order: SortOrder;
}

export interface CryptoAsset {
  name: string;
  fullName: string;
  logo: string;
  symbol: string;
  price: number;
  tags: string[];
}

export interface CryptoTicker {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  prevClosePrice: number;
  lastPrice: number;
  volume: number;
}

export type CryptoData = CryptoAsset & CryptoTicker;
