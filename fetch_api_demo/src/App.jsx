import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./components/Home.jsx";
import { Post } from "./components/components/Post.jsx";


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
