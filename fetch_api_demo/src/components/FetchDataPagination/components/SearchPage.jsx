import { PaginationContext } from "./PaginationContext";
import { useContext } from "react";

export const SearchPage = () => {
    const { searchPage, setSearchPage, handleClickSearch, searchError } = useContext(PaginationContext);

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
        </>
    )

}