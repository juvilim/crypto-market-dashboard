import { TAGS } from "../constants";

interface Props {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}

const Tags = ({ selectedTag, setSelectedTag }: Props) => {
  return (
    <div className="flex space-x-2 md:space-x-4 w-full pb-4 text-gray-500 text-sm whitespace-nowrap overflow-scroll ">
      {TAGS.map(({ tag, display }) => (
        <div
          key={tag}
          className={`py-2 px-4 ${
            tag === selectedTag ? "text-gray-900 bg-gray-100 rounded-lg" : ""
          } cursor-pointer`}
          onClick={() => setSelectedTag(tag)}
        >
          {display}
        </div>
      ))}
    </div>
  );
};

export default Tags;
