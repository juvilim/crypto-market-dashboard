export const DEBOUNCE_DELAY = 300;
export const DEFAULT_REFETCH_INTERVAL = 2000;
export const TAGS = [
  { tag: "", display: "All" },
  { tag: "Metaverse", display: "Metaverse" },
  { tag: "Gaming", display: "Gaming" },
  { tag: "defi", display: "DeFi" },
  { tag: "innovation-zone", display: "Innovation" },
  { tag: "Layer1_Layer2", display: "Layer 1 / Layer 2" },
  { tag: "fan_token", display: "Fan Token" },
  { tag: "NFT", display: "NFT" },
  { tag: "storage-zone", display: "Storage" },
  { tag: "Polkadot", display: "Polkadot" },
  { tag: "pos", display: "POS" },
  { tag: "pow", display: "POW" },
  { tag: "Launchpad", display: "Launchpad" },
  { tag: "Launchpool", display: "Launchpool" },
  { tag: "BSC", display: "BSC" },
  { tag: "ETF", display: "ETF" },
];
export const TABLE_COLUMNS = [
  { label: "Name", value: "name", width: "40%" },
  { label: "Latest Price", value: "lastPrice", width: "20%" },
  { label: "24h Change", value: "priceChangePercent", width: "20%" },
  { label: "24h Volume", value: "volume", width: "20%" },
];
export const DEFAULT_SORT_KEY = "symbol";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
