import React from "react";
import { DEFAULT_PAGE } from "../constants";
import { ArrowLeftIcon, ArrowRightIcon } from "./ArrowIcon";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

const Pagination = ({ page, setPage, totalPage }: Props) => {
  if (!totalPage) return null;

  return (
    <div className="py-4 flex justify-end">
      <ul className="inline-block space-x-2 text-sm rounded">
        <li className="inline">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === DEFAULT_PAGE}
            className="p-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:rounded disabled:hover:bg-transparent disabled:fill-gray-200"
          >
            <ArrowLeftIcon />
          </button>
        </li>
        {[...Array(totalPage)].map((_item, index) => {
          return (
            <li key={index} className="inline">
              <button
                className={`p-2 transition duration-300 ease-in-out ${
                  index + 1 === page
                    ? "bg-gray-100 rounded font-semibold cursor-default"
                    : "hover:bg-gray-100 hover:rounded cursor-pointer"
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
        <li className="inline">
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPage}
            className="p-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:rounded disabled:hover:bg-transparent disabled:fill-gray-200"
          >
            <ArrowRightIcon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
