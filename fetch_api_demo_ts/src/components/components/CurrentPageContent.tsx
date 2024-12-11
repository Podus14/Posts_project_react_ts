import { Link } from "react-router";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const CurrentPageContent = ({ currentPage, items }: {currentPage: number, items: Post[] }) => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm mt-4">
      <div className="mb-6 text-2xl font-semibold">Current page {currentPage}</div>
      <div className="flex flex-col gap-4">
        {items.map((post) => (
          <Link key={post.id} to={`/${post.id}`}>
            <p className="group rounded-lg border p-4 hover:bg-gray-300 font-mono cursor-pointer">
              {post.id} {post.title}
            </p>
          </Link>
        ))}
      </div>
    </div>  
  );
};
