import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./components/Home.jsx";
import { Post } from "./components/components/Post.jsx";
import { useQuery } from "@tanstack/react-query";

function App () {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    initialData: [],
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data = {data} isPending = {isPending} isError = {isError} error = {error} />} />
        <Route path=":postId" element={<Post data= {data}/>} />
      </Routes>
    </BrowserRouter> 
  );
};

export default App;
