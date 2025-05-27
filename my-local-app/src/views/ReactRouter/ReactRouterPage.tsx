import { Link, Route, Routes } from "react-router-dom";
import { NewsPage } from "./News/NewsPage";
import { HomePage } from "./Home/HomePage";
import { ContactPage } from "./Contact/ContactPage";

// import { ContactPage } from "./Contact/ContactPage";

export function ReactRouterPage() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li className="text-2xl font-bold text-blue-500">
              <Link to="/"className="underline">Home</Link>
            </li>
            <li className="text-2xl font-bold text-blue-500">
              <Link to="/news"className="underline">News</Link>
            </li>
            <li className="text-2xl font-bold text-blue-500">
              <Link to="/contact"className="underline">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element ={<HomePage/>} />
          <Route path="/news" element ={<NewsPage/>} />
          <Route path="/contact" element ={<ContactPage/>} />

        </Routes>
        
      </div>
    );
  }