export const CurrentPageContent = ({ currentPage, items }) => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm mt-4">
      <div className="mb-6 text-2xl font-semibold">Current page {currentPage}</div>
      <div className="flex flex-col gap-4">
        {items.map((post) => (
          <p  className="group rounded-lg border p-4 hover:bg-gray-300 font-mono" key={post.id}>
            {post.id} {post.title}
          </p>
        ))}
      </div>
    </div>  
  );
};
