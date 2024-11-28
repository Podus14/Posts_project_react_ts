import Style from "./Pagination.module.css"

export const Pagination = ( {setCurrentPage, currentPageLoading, currentRowOfPages, numberOfPages, itemsInRowPages, currentPage} ) => {

    const handleClickPageNumber = (page, index) => {
        setCurrentPage(page);
        currentPageLoading(page);

        if (page === 1 || (currentRowOfPages[0] !== 2 && index < 3 && page <= 4)) {
            setcurrentRowOfPages(numberOfPages.slice(1, itemsInRowPages + 1));
        }

        if (index >= 4 && page < numberOfPages.length - 3) {
            setcurrentRowOfPages(numberOfPages.slice(page - 4, page + 3));
        }
        if (page >= numberOfPages.length - 3) {
            setcurrentRowOfPages(numberOfPages.slice(numberOfPages.length - itemsInRowPages - 1, page + (numberOfPages.length - page - 1)));
        }
        if (currentRowOfPages[0] !== 2 && index < 3 && page > 4) {
            setcurrentRowOfPages(numberOfPages.slice(page - 4, page + 3));  
        }
    }

    return (
        <div>
            <span><a href="" className={`${Style.a} ${currentPage === 1 ? Style.active : ''}`} onClick={e => {
                e.preventDefault();
                handleClickPageNumber(1);
            }}>1 </a></span>
            {currentRowOfPages.map((page, index, arr) => {
                const isLastElement = index === arr.length -1;
                const isFirstElement = index === 0
                if((isLastElement === true && page !== numberOfPages.length - 1) || (isFirstElement === true && page !== 2)) {
                    return (
                        <span><a href="" className={Style.a} onClick={e => {
                            e.preventDefault();
                            handleClickPageNumber(page, index);
                        }}>... </a></span>
                    )
                }
                return (
                    <span><a href="" className={`${Style.a} ${currentPage === page ? Style.active : ''}`} onClick={e => {
                        e.preventDefault();
                        handleClickPageNumber(page, index);
                    }}>{page} </a></span>
                )    
                }
            )}
            <span><a href="" className={`${Style.a} ${currentPage === numberOfPages.length ? Style.active : ''}`}onClick={e => {
                e.preventDefault();
                handleClickPageNumber(numberOfPages.length);
            }}> {numberOfPages.length}</a></span>
        </div>
    ) 
}