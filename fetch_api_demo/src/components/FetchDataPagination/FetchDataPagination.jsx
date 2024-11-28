import { useEffect, useState } from "react";
import { CurrentPageContent } from "./components/CurrentPageContent";
import { PageControls } from "./components/PageControls";
import { Pagination } from "./components/Pagination";

const itemsInRowPages = 7;
const itemsPerPage = 5;

export const FetchDataPagination = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
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

    useEffect(() => {
        fetchData();
    },[]);


    if (loading) return <div>Завантаження... </div>
    if (error) return <div>{error}</div>


    return (
        <>
            <CurrentPageContent  currentItems = {currentItems} currentPage = {currentPage}/>
            <PageControls currentPage = {currentPage} itemsPerPage = {itemsPerPage} data = {data} setCurrentPage={setCurrentPage} currentPageLoading={currentPageLoading} setcurrentRowOfPages = {setcurrentRowOfPages} numberOfPages = {numberOfPages} itemsInRowPages = {itemsInRowPages}/>
            <Pagination setCurrentPage = {setCurrentPage} currentPageLoading = {currentPageLoading} currentRowOfPages = {currentRowOfPages}  numberOfPages = {numberOfPages} itemsInRowPages = {itemsInRowPages} currentPage = {currentPage}/>
        </>
        
    )
}
