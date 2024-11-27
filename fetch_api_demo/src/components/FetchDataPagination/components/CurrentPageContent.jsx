import { PaginationContext } from "./PaginationContext";
import { useContext } from "react";

export const CurrentPageContent = () => {
    const {currentPage, currentItems} = useContext(PaginationContext);

    return (
        <>
            <div>Current page {currentPage}</div>
            <div>{currentItems.map(post => (
                <p key={post.id}>{post.id} {post.title}</p>
            ))}</div>
        </>
    )

}