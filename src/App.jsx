import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Proteced from "./components/proteced";

function App() {
  

  return (
    <>
     <BrowserRouter>     <Routes>

<Route path="/" element={<Login/>}/>

<Route element={<Proteced/>}> 

<Route path="/Feed" element={<Feed/>}/>

</Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
