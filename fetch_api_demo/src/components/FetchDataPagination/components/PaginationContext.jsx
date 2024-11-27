import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({сhildren}) => {
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

    const value = {
        data,
        setData,
        loading,
        setLoading,
        error, 
        setError,
        currentPage,
        setCurrentPage,
        currentItems,
        setCurrentItems,
        searchPage,
        setSearchPage,
        searchError,
        setSearchError,
        numberOfPages,
        setNumberOfPages,
        currentRowOfPages,
        setcurrentRowOfPages,
        itemsInRowPages,
        itemsPerPage
    }
    return (
        <PaginationContext.Provider value={value}>
            {сhildren}
        </PaginationContext.Provider>
    )
}