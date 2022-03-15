import { useQuery } from "react-query";
import { fetchWrapper } from "../utils";

export interface CryptoCurrencyAsset {
  id: string;
  assetCode: string;
  assetName: string;
  logoUrl: string;
  fullLogoUrl: string;
  tags: string[];
  plateType: string | null;
}

interface Response {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: CryptoCurrencyAsset[];
}

const fetchAssets = async () => {
  return await fetchWrapper<Response>(
    "https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset"
  );
};

export const useAssets = (queryKeys: Record<string, any>) =>
  useQuery(["assets", queryKeys], fetchAssets, { keepPreviousData: true });
