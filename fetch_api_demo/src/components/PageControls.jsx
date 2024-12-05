import { useRef } from "react";

export const PageControls = ({
  setCurrentPage,
  currentPage,
  minPage,
  maxPage,
}) => {
  const searchInput = useRef(null);

  const handleClickSearch = () => {
    const parsedPage = Number(searchInput.current.value);
    if (parsedPage < minPage) return setCurrentPage(minPage);
    if (parsedPage > maxPage) return setCurrentPage(maxPage);
    setCurrentPage(parsedPage);
  };

  const handleClickPrev = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div style={{ display: "flex" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClickSearch();
        }}
      >
        <input
          style={{ width: "165px" }}
          type="number"
          min={1}
          max={20}
          placeholder="Введіть номер сторінки"
          ref={searchInput}
        />
        <button type="submit">Пошук сторінки</button>
      </form>

      <button onClick={handleClickPrev} disabled={currentPage <= minPage}>
        Попередня сторінка
      </button>
      <button onClick={handleClickNext} disabled={currentPage >= maxPage}>
        Наступна сторінка
      </button>
    </div>
  );
};
