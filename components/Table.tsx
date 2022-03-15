import { SortOrder, TABLE_COLUMNS } from "../constants";
import Coin from "./Coin";
import { SortIcon, SortUpIcon, SortDownIcon } from "./SortIcon";

export interface SortingRule {
  sortBy: string;
  order: SortOrder;
}

interface Props {
  data?: any[];
  sort?: SortingRule;
  onColumnHeaderClick: (selectedColumn: string) => () => void;
}

const Table = ({ data, sort, onColumnHeaderClick }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 border-gray-50 border-b-0">
          {TABLE_COLUMNS.map(({ label, value }, index) => (
            <th
              key={index}
              className="py-3 px-4 text-xs font-normal"
              onClick={onColumnHeaderClick(value)}
            >
              <div className="flex items-center space-x-1">
                <span>{label}</span>
                {!sort || sort.sortBy !== value ? (
                  <SortIcon />
                ) : sort.order === SortOrder.ASC ? (
                  <SortUpIcon />
                ) : (
                  <SortDownIcon />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(!data || !data.length) && (
          <tr>
            <td colSpan={TABLE_COLUMNS.length} className="text-center">
              No Result
            </td>
          </tr>
        )}
        {data?.map((item) => (
          <Coin key={item.id} assetData={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
