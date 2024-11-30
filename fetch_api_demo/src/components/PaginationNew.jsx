import { useMemo } from "react";

export const Pagination = ({
  maxPage,
  currentPage,
  setCurrentPage,
  displayRange = 5,
}) => {
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

  const handleEllipsisClick = (direction) => {   
          
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

  if (maxPage <= 1) return null;

  return (
    <div role="navigation" aria-label="Pagination">
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {visibleButtons.map((button, index) => {
          if (button === "left-dots" || button === "right-dots") {
            return (
              <button
                key={`${button}-${index}`}
                onClick={() =>
                  handleEllipsisClick(button === "left-dots" ? "left" : "right")
                }
                style={{
                  padding: "4px 8px",
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
                aria-label={`Jump ${
                  button === "left-dots" ? "backward" : "forward"
                }`}
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
              style={{
                padding: "4px 8px",
                border: "1px solid #ddd",
                background: currentPage === pageNumber ? "#eee" : "white",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};
