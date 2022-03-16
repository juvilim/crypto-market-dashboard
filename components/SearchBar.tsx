import { SearchIcon } from "./SearchIcon";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ value, setValue }: Props) => {
  const handleClearSearch = () => setValue("");

  return (
    <div className="flex items-center w-full md:w-56 py-2 px-3 my-4 space-x-2 text-xs border border-gray-100 transition duration-300 ease-in-out hover:border-green-500 rounded">
      <SearchIcon className="fill-gray-500" />
      <input
        type="text"
        placeholder="Search Coin"
        className="w-full focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span
        className={`${!value ? "hidden" : ""} text-gray-500 cursor-pointer`}
        onClick={handleClearSearch}
      >
        x
      </span>
    </div>
  );
};

export default SearchBar;
