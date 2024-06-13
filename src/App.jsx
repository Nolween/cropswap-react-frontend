import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {BlogIndex} from "./pages/Blog/BlogIndex.jsx";

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/blog', element: <BlogIndex /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
