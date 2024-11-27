import {PaginationContext} from "./PaginationContext"
import { useContext } from "react"

export const PaginationControls = () => {
    const {
        currentPage,
        setCurrentPage,
        currentRowOfPages,
        numberOfPages,
        currentPageLoading,
        handleClickPageNumber,
        handleClickNext,
        handleClickPrev,
    } = useContext(PaginationContext);
}

return (
    
)