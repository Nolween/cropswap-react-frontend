import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {BlogIndex} from "./pages/Blog/BlogIndex.jsx";
import {BlogShow} from "./pages/Blog/BlogShow.jsx";

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/blog', element: <BlogIndex /> },
    { path: '/blog/:tag', element: <BlogIndex /> },
    { path: '/blog/article/:articleid', element: <BlogShow /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
