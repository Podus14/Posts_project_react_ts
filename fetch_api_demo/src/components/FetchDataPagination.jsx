import React, { useEffect, useState } from "react";
import Style from "./FetchDataPagination.module.css"

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
    const itemsInRowPages = 7;
    const itemsPerPage = 5;



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
                const numberOfPages = arrPages.slice(1, itemsInRowPages + 1);
                setcurrentRowOfPages(numberOfPages);
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
            return;
        }
        setSearchError("Помилка при пошуку ");
    }

    const handleClickPrev = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        currentPageLoading(prevPage);
    }

    const handleClickNext = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        currentPageLoading(nextPage);
    }

    const handleClickPageNumber = (page, index) => {
        setCurrentPage(page);
        currentPageLoading(page);

        if (page === numberOfPages.length) {
            // setcurrentRowOfPages(numberOfPages.slice(, numberOfPages.length));
        } 
        if (index >= 4 && page < numberOfPages.length - 3) {
            setcurrentRowOfPages(numberOfPages.slice(page - 4, page + 3));
            return
        }
        if (page >= numberOfPages.length - 3) {
            console.log(page);
            console.log(numberOfPages.length)
            setcurrentRowOfPages(numberOfPages.slice(numberOfPages.length - itemsInRowPages, page + (numberOfPages.length - page - 1)));
        }

        // if (currentRowOfPages[0] !== 2 && index < 4 && page < numberOfPages.length - 3)
    }

    // const changePagination = (page) => {

    // }

    useEffect(() => {
        fetchData();
    },[]);


    if (loading) return <div>Завантаження... </div>
    if (error) return <div>{error}</div>


    return (
        <>
            <div>Current page {currentPage}</div>
            <div>{currentItems.map(post => (
                <p key={post.id}>{post.id} {post.title}</p>
            ))}</div>
            <input type="text" placeholder="Введіть номер сторінки" onChange={e => setSearchPage(e.target.value.trim())}/>
            <button onClick={handleClickSearch}>Пошук сторінки</button>
            <button onClick={handleClickPrev} disabled ={currentPage === 1}>Попередня сторінка</button>
            <button onClick={handleClickNext} disabled = {data.length <= currentPage * itemsPerPage}>Наступна сторінка</button>
            {searchError !== undefined && <div>{searchError}</div>}
            {/* <div>{currentRowOfPages.map(page => (
                <span><a href="" className={Style.a} onClick={e => {
                    e.preventDefault();
                    handleClickPageNumber(page);
                }}>{page} </a></span>
                ))}... <span><a href="" className={Style.a} onClick={e => {
                    e.preventDefault();
                    handleClickPageNumber(numberOfPages.length);
                }}>{numberOfPages.length}</a></span>
            </div> */}
            <div>
                <span><a href="" className={Style.a} onClick={e => {
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
                    // if (isFirstElement === true && index !== 0) {
                    //     console.log(index)
                    //     return (
                    //         <span><a href="" className={Style.a} onClick={e => {
                    //             e.preventDefault();
                    //             handleClickPageNumber(page);
                    //         }}>... </a></span>
                    //     )
                    // }
                    return (
                        <span><a href="" className={Style.a} onClick={e => {
                            e.preventDefault();
                            handleClickPageNumber(page, index);
                        }}>{page} </a></span>
                    )    
                    }
                )}
                <span><a href="" className={Style.a} onClick={e => {
                    e.preventDefault();
                    handleClickPageNumber(numberOfPages.length);
                }}> {numberOfPages.length}</a></span>

            </div>
        </>
        
    )
}
