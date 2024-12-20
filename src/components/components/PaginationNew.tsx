import { Dispatch, SetStateAction, useMemo } from "react";
import cn from "../../utils/classNames";

export const Pagination = ({
  minPage,
  maxPage,
  currentPage,
  setCurrentPage,
  displayRange = 5,
}: {minPage: number, maxPage: number, currentPage: number,setCurrentPage: Dispatch<SetStateAction<number>> , displayRange?: number}) => {
  const buttons = useMemo(() => {
    return Array.from({ length: maxPage }, (_, i) => i + 1);
  }, [maxPage]);

  const visibleButtons = useMemo(() => {
    if (maxPage <= displayRange + 2) {
      return buttons;
    }

    let pageNumbers = [];

    pageNumbers.push(1);

    let rangeStart = Math.max(2, currentPage - Math.round(Math.floor(displayRange / 2)));
    let rangeEnd = Math.min(maxPage - 1, rangeStart + displayRange - 1);


    if (rangeEnd === maxPage - 1) {
      rangeStart = Math.max(2, rangeEnd - displayRange);
    }

    if (currentPage < 5) {
      rangeEnd = rangeEnd + 1;
    }
    
    if (rangeStart > 2 && currentPage !== displayRange) {
      pageNumbers.push("left-dots");
    }
    if (currentPage === displayRange && rangeStart > 2) {
      pageNumbers.push(2);
    } 

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }

    if (rangeEnd === maxPage - 2) {
      pageNumbers.push(maxPage-1);
    } 
    
    if (rangeEnd < maxPage - 2) {
      pageNumbers.push("right-dots");
    }
    
    if (maxPage !== rangeEnd) {
      pageNumbers.push(maxPage);
    }

    return pageNumbers;
  }, [buttons, currentPage, maxPage, displayRange]);

  const handleEllipsisClick = (direction: string) => {   
          
      if (currentPage > displayRange && currentPage < maxPage - 3){
        if (direction === "left") {
          const newPage = currentPage - displayRange + 2;
          setCurrentPage(newPage);
          return
        }
        const newPage = currentPage + displayRange - 2;
        setCurrentPage(newPage);
        return
      }
      if (direction === "left") {
        const newPage = maxPage - displayRange - 2;
        setCurrentPage(newPage);
        return
      }
      const newPage = displayRange + 3;
      setCurrentPage(newPage);
      return
  };

  const handleClickPrev = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  if (maxPage <= 1) return null;

  return (
    <div role="navigation" aria-label="Pagination" className="flex place-content-center gap-4">
      <button onClick={handleClickPrev} disabled={currentPage <= minPage} className={cn("rounded-md px-4 py-2 font-mono", currentPage <= minPage ? "bg-gray-400 cursor-not-allowed " : "bg-white hover:bg-gray-300")}>
        {'<'} Previous
      </button>
      <div className="flex">
        {visibleButtons.map((button, index) => {
          if (button === "left-dots" || button === "right-dots") {
            return (
              <button
                key={`${button}-${index}`}
                onClick={() =>
                  handleEllipsisClick(button === "left-dots" ? "left" : "right")
                }
                aria-label={`Jump ${
                  button === "left-dots" ? "backward" : "forward"
                }`}
               className="rounded-md px-2 py-1 font-mono bg-white hover:bg-gray-300"
              >
                ...
              </button>
            );
          }

          const pageNumber = Number(button);
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              className={cn("rounded-md px-2 py-1 font-mono", currentPage === pageNumber ? "bg-gray-300 hover:bg-gray-200" : "bg-white hover:bg-gray-300")}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button onClick={handleClickNext} disabled={currentPage >= maxPage} className={cn("rounded-md px-4 py-2 font-mono", currentPage >= maxPage ? "bg-gray-400 cursor-not-allowed " : "bg-white hover:bg-gray-300")}>
        Next {'>'}
      </button>
    </div>
  );
};
