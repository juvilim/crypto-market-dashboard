import { SearchIcon } from "./SearchIcon";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ value, setValue }: Props) => {
  return (
    <div className="flex items-center w-56 py-2 px-3 my-4 space-x-2 border border-gray-100 hover:border-green-500 rounded">
      <SearchIcon className="fill-gray-500" />
      <input
        type="text"
        placeholder="Search Coin"
        className="w-full text-xs focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
