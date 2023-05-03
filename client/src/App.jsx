import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { logo } from "./assets";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-3 rounded-md">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<CreatePost />} path="/create-post" />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
