import {PaginationContext} from "./PaginationContext"
import { useContext, useEffect } from "react"

export const FetchData = () => {
    const {setData,
        setCurrentItems,
        setLoading,
        setError,
        setNumberOfPages,
        setcurrentRowOfPages,
        itemsInRowPages,
        itemsPerPage} = useContext(PaginationContext);

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
    
    useEffect(() => {
        console.log("jops2")
        fetchData();
    },[]);

    if (loading) return <div>Завантаження... </div>
    if (error) return <div>{error}</div>


    return (
        null
    )
}