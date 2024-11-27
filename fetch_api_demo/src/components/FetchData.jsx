import React, { useEffect, useState } from "react";

export const FetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const result = await response.json();
                setData(result);
            } 
            catch (error) {
                console.error("Помилка завантаження даних: " + error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
        
    }, [])

    if (loading) return <p>Завантаження</p>

    return (
        <ul>
            {
                data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))
            }
        </ul>
    );
}
