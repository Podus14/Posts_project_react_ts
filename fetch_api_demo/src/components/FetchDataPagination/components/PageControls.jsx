import { useState } from "react";


export const PageControls = ( { currentPage, itemsPerPage, data, setCurrentPage, currentPageLoading, setcurrentRowOfPages, numberOfPages, itemsInRowPages} ) => {

    const [searchPage, setSearchPage] = useState(null);
    const [searchError, setSearchError] = useState(undefined);


    const handleClickSearch = () => {
        const parsedPage = Number(searchPage);
        
        if (!isNaN(parsedPage) && data.length >= parsedPage * itemsPerPage && parsedPage >= 1) {
            setCurrentPage(parsedPage);
            currentPageLoading(parsedPage);
            setSearchError(undefined);
            if (parsedPage > 4 && parsedPage < numberOfPages.length - 3) {
                setcurrentRowOfPages(numberOfPages.slice(parsedPage - 4, parsedPage + 3));
            }
            if (parsedPage <= 4) {
                setcurrentRowOfPages(numberOfPages.slice(1, itemsInRowPages + 1));
            }
            if (parsedPage >= numberOfPages.length - 3){
                setcurrentRowOfPages(numberOfPages.slice(numberOfPages.length - itemsInRowPages - 1, parsedPage + (numberOfPages.length - parsedPage - 1)));
            }
            return;
            
        }
        setSearchError("Помилка при пошуку ");
    }

    const handleClickPrev = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        currentPageLoading(prevPage);
    
        if (prevPage > 4 && prevPage < numberOfPages.length - 3) {
            setcurrentRowOfPages(numberOfPages.slice(prevPage - 4, prevPage + 3));
        }
    }

    const handleClickNext = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        currentPageLoading(nextPage);

        if (nextPage > 4 && nextPage < numberOfPages.length - 3) {
            setcurrentRowOfPages(numberOfPages.slice(nextPage - 4, nextPage + 3));
        }
    }


    return (
        <>
            <input type="text" placeholder="Введіть номер сторінки" 
                onChange={e => setSearchPage(e.target.value.trim())} 
                onKeyDown={e => {
                    if(e.key === "Enter") {
                        handleClickSearch();
                    }
            }}/>
            <button onClick={handleClickSearch}>Пошук сторінки</button>
            <button onClick={handleClickPrev} disabled ={currentPage === 1}>Попередня сторінка</button>
            <button onClick={handleClickNext} disabled = {data.length <= currentPage * itemsPerPage}>Наступна сторінка</button>
            {searchError !== undefined && <div>{searchError}</div>}
        </>
    )
}

