import { CryptoCurrencyAsset } from "../hooks/useAssets";
import { useTickerPriceChange } from "../hooks/useTickerPriceChange";
import { useTradingPair } from "../hooks/useTradingPair";
import { bigNumberFormat, currencyFormat } from "../utils";

interface Props {
  assetData: CryptoCurrencyAsset;
}

const Coin = ({ assetData }: Props) => {
  const { assetCode, assetName, logoUrl } = assetData;

  const {
    isLoading: loadingTradingPair,
    data: tradingPairData,
    error: tradingPairError,
  } = useTradingPair(assetCode);

  const symbolPair = tradingPairData?.data?.[0]?.symbolPair;

  const { isLoading, data, error } = useTickerPriceChange(symbolPair);

  const priceData = {
    symbol: data?.symbol,
    priceChange: Number(data?.priceChange),
    priceChangePercent: Number(data?.priceChangePercent),
    prevClosePrice: Number(data?.prevClosePrice),
    lastPrice: Number(data?.lastPrice),
    volume: Number(data?.volume),
  };

  if (!symbolPair || !priceData) {
    return null;
  }

  if (loadingTradingPair || isLoading) {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
  if (tradingPairError || error) {
    return (
      <tr>
        <td>{tradingPairError || (error as any)}</td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-100">
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div
            className="h-8 w-8 shadow-inner rounded-full bg-no-repeat"
            style={{
              background: "green",
              // backgroundImage: `url(${logoUrl})`,
            }}
          />
          <span>{assetCode}</span>
          <span className="text-sm text-gray-500">{assetName}</span>
        </div>
      </td>
      <td
        className={`py-5 px-4
        `}
      >
        {currencyFormat(priceData.lastPrice)}
      </td>
      <td
        className={`py-5 px-4${
          priceData.priceChangePercent > 0
            ? " text-green-700"
            : priceData.priceChangePercent < 0
            ? " text-red-600"
            : ""
        }`}
      >
        {priceData.priceChangePercent > 0 ? "+" : ""}
        {priceData.priceChangePercent.toFixed(2)}%
      </td>
      <td className="py-5 px-4">{bigNumberFormat(priceData.volume)}</td>
    </tr>
  );
};

export default Coin;
