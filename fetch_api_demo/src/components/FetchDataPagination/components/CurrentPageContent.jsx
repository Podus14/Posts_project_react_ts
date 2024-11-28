export const CurrentPageContent = ({currentPage, currentItems}) => {


    return (
        <>
            <div>Current page {currentPage}</div>
            <div>{currentItems.map(post => (
                <p key={post.id}>{post.id} {post.title}</p>
            ))}</div>
        </>
    )

}