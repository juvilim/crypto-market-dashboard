import { SortOrder, TABLE_COLUMNS } from "../constants";
import { CryptoData, SortingRule } from "../types";

import Crypto from "./Crypto";
import { SortIcon, SortUpIcon, SortDownIcon } from "./SortIcon";

interface Props {
  data: CryptoData[];
  sort?: SortingRule;
  onColumnHeaderClick: (selectedColumn: string) => () => void;
}

const Table = ({ data, sort, onColumnHeaderClick }: Props) => {
  return (
    <div className="flex justify-between md:table w-full">
      <div className="hidden md:table-header-group">
        <div className="table-row bg-gray-100 border-gray-50 border-b-0">
          {TABLE_COLUMNS.map(({ label, value, width }, index) => (
            <div
              key={index}
              className="md:table-cell align-middle py-3 px-4 text-xs font-normal"
              onClick={onColumnHeaderClick(value)}
              style={{ width }}
            >
              <div
                className={`flex items-center ${
                  index !== 0 ? "justify-end" : ""
                } space-x-1`}
              >
                <span>{label}</span>
                {!sort || sort.sortBy !== value ? (
                  <SortIcon />
                ) : sort.order === SortOrder.ASC ? (
                  <SortUpIcon />
                ) : (
                  <SortDownIcon />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:table-row-group w-full">
        {data?.map((item, index) => (
          <Crypto key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Table;
