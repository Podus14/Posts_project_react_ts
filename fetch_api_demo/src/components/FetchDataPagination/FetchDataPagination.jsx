import { useEffect, useState } from "react";
import Style from "./FetchDataPagination.module.css"
import { PaginationProvider } from "./components/PaginationContext";
import { FetchData } from "./components/FetchData";
import { CurrentPageContent } from "./components/CurrentPageContent";


const itemsInRowPages = 7;
const itemsPerPage = 5;

export const FetchDataPagination = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchPage, setSearchPage] = useState(null);
    const [searchError, setSearchError] = useState(undefined);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [currentRowOfPages, setcurrentRowOfPages] = useState([]);
    


    async function fetchData() {
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await response.json();
            if(!response.ok) {
                throw new Error("Помилка завантаження даних з серверу")
            }
            setData(result); 
            setCurrentItems(result.slice(0, itemsPerPage));

            const arrPages = [] 
            for (let i = 1; i <= (Math.ceil(result.length / 5)); i++){
                arrPages.push(i);
            }

            setNumberOfPages(arrPages);
            if (arrPages.length >= 9) {
                setcurrentRowOfPages(arrPages.slice(1, itemsInRowPages + 1));
            }
            else {
                setcurrentRowOfPages(arrPages);
            }

        } 
        catch(error) {
            setError(error.message);
        } 
        finally {
            setLoading(false);
        }
    }

    const currentPageLoading = (currentPage) => {
        const indexEnd = (currentPage * itemsPerPage);
        const indexStart = indexEnd - itemsPerPage;
        setCurrentItems(data.slice(indexStart, indexEnd));
    }

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

    useEffect(() => {
        fetchData();
    },[]);


    if (loading) return <div>Завантаження... </div>
    if (error) return <div>{error}</div>


    return (
        <>
            {/* 
            <PaginationProvider>
                <FetchData/>
                <CurrentPageContent/>
            </PaginationProvider> */}
            
            <div>Current page {currentPage}</div>
            <div>{currentItems.map(post => (
                <p key={post.id}>{post.id} {post.title}</p>
            ))}</div>
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
        </>
        
    )
}
