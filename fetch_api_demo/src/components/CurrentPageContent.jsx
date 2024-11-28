export const CurrentPageContent = ({ currentPage, items }) => {
  return (
    <>
      <div>Current page {currentPage}</div>
      <div>
        {items.map((post) => (
          <p key={post.id}>
            {post.id} {post.title}
          </p>
        ))}
      </div>
    </>
  );
};
