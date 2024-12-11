import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./components/Home.tsx";
import { Post } from "./components/components/Post.tsx";

function App () {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path=":postId" element={<Post/>} />
      </Routes>
    </BrowserRouter> 
  );
};

export default App;
