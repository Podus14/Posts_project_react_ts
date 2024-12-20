import { Dispatch, SetStateAction, useRef } from "react";

export const PageControls = ({
  setCurrentPage,
  minPage,
  maxPage,
}: {minPage: number, maxPage: number, setCurrentPage: Dispatch<SetStateAction<number>>}) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const handleClickSearch = () => {
    const parsedPage = Number(searchInput.current?.value); 
    if (parsedPage < minPage) return setCurrentPage(minPage);
    if (parsedPage > maxPage) return setCurrentPage(maxPage);
    setCurrentPage(parsedPage);
  };

  return (
      <form className="flex flex-wrap place-content-between"
        onSubmit={(e) => {
          e.preventDefault();
          handleClickSearch();
        }}
      >
        <input
          className="w-9/12 border-2	rounded-md border-black hover:border-gray-300 pl-2 font-mono"
          type="number"
          min={1}
          max={maxPage}
          placeholder="Enter page number"
          ref={searchInput}
        />
        <button className="text-white bg-black rounded-md px-4 py-2 hover:bg-gray-400 hover:text-black" type="submit">Go to Page</button>
      </form>
  );
};
