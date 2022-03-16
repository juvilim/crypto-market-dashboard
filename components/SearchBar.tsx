import React from "react";
import * as _ from "lodash";

import { SearchIcon } from "./SearchIcon";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ value, setValue }: Props) => {
  const [input, setInput] = React.useState<string>(value);

  React.useEffect(() => {
    setInput(value);
  }, [value]);

  const handleClearSearch = () => setValue("");

  const debouncedSearch = React.useRef(
    _.debounce((value: string) => {
      setValue(value);
    }, 300)
  ).current;

  return (
    <div className="flex items-center w-full md:w-56 py-2 px-3 my-4 space-x-2 text-xs border border-gray-100 transition duration-300 ease-in-out hover:border-green-500 rounded">
      <SearchIcon className="fill-gray-500" />
      <input
        type="text"
        placeholder="Search Coin"
        className="w-full focus:outline-none"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          debouncedSearch(event.target.value);
        }}
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
