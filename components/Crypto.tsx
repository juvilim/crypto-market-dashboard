import { TABLE_COLUMNS } from "../constants";
import { toMillionFormat, currencyFormat } from "../utils";
// import Image from "next/image";
import { CryptoData } from "../types";

interface Props {
  data: CryptoData;
}

const Crypto = ({ data }: Props) => {
  const { logo, name, fullName, lastPrice, priceChangePercent, volume } = data;
  return (
    <div className="md:table-row mb-1 md:mb-0 pb-2 md:pb-0 border-b border-gray-100 md:border-0 md:hover:bg-gray-100">
      <div className="md:table-cell align-middle p-1 md:p-4 md:border-b border-gray-100">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div
            className="h-5 md:h-8 w-5 md:w-8 shadow-inner rounded-full bg-no-repeat"
            style={{
              backgroundImage: `image('${logo}')`,
            }}
          />
          {/* <Image
            height={32}
            width={32}
            alt={`logo-${assetCode}`}
            className="h-8 w-8 shadow-inner rounded-full"
            src={logoUrl}
            referrerPolicy="origin-when-cross-origin"
          /> */}
          <span>{name}</span>
          <span className="text-xs md:text-sm text-gray-500">{fullName}</span>
        </div>
      </div>
      <div className="flex justify-between md:contents">
        <div className="md:hidden text-gray-700">
          {TABLE_COLUMNS.filter((item) => item !== TABLE_COLUMNS[0]).map(
            ({ label }, index) => (
              <div key={index} className="p-1 text-xs font-normal">
                <div className="flex items-center space-x-1">
                  <span>{label}</span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="md:contents align-middle text-xs md:text-base text-right">
          <div className="md:table-cell p-1 md:py-5 md:px-4 md:border-b border-gray-100">
            {currencyFormat(lastPrice)}
          </div>
          <div
            className={`md:table-cell p-1 md:py-5 md:px-4${
              priceChangePercent > 0
                ? " text-green-700"
                : priceChangePercent < 0
                ? " text-red-600"
                : ""
            } font-medium md:border-b border-gray-100`}
          >
            {priceChangePercent > 0 ? "+" : ""}
            {priceChangePercent.toFixed(2)}%
          </div>
          <div className="md:table-cell p-1 md:py-5 md:px-4 md:border-b border-gray-100">
            {toMillionFormat(volume)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
