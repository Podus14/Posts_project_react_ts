import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";

export const Post = () => {

    const params = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
            );
            if (!response.ok) {
            throw new Error("Помилка завантаження даних з серверу");
            }
            return await response.json();
        },
    });


    if (isPending) return <div>Завантаження... </div>;
    if (isError) return <div>{error.message}</div>;
    

    return (
        <div className="mt-4 mx-4 min-h-screen">
            <div className="rounded-lg border bg-card p-6 shadow-sm mx-auto space-y-4  p-3 p-6">
                <div className="font-mono text-lg">
                    <span className="text-gray-500">User ID: </span>
                    <span>{data[params.postId - 1].userId}</span>
                </div>
                <div className="font-mono text-lg">
                    <span className="text-gray-500">Post: </span>
                    <span>{params.postId}</span>
                </div>
                <div className="font-mono text-lg">
                    <span className="text-gray-500">Title: </span>
                    <span>{data[params.postId - 1].title}</span>
                </div>
                <div className="bg-gray-300 rounded-lg p-6 font-mono text-sm leading-relaxed">{data[params.postId - 1].body}</div>
            </div>
        </div>
    )
}