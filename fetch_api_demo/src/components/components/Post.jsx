import { useParams } from "react-router"

export const Post = ( { data } ) => {

    const params = useParams();

    console.log(data[params.postId - 1]);

    return (
        <div>
            <div>User ID {data[params.postId - 1].userId}</div>
            <div>Post {params.postId}</div>
        </div>
    )
}