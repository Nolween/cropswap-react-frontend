import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {BlogIndex} from "./pages/Blog/BlogIndex.jsx";
import {BlogShow} from "./pages/Blog/BlogShow.jsx";
import {CropIndex} from "./pages/Crop/CropIndex.jsx";
import {CropShow} from "./pages/Crop/CropShow.jsx";
import {AccountInformations} from "./pages/Account/AccountInformations.jsx";
import {Test} from "./pages/Test/Test.jsx";
import {AccountCrop} from "./pages/Account/AccountCrop.jsx";
import {AccountMessages} from "./pages/Account/AccountMessages.jsx";

const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/blog', element: <BlogIndex/>},
    {path: '/blog/:tag', element: <BlogIndex/>},
    {path: '/blog/article/:articleid', element: <BlogShow/>},
    {path: '/crop', element: <CropIndex/>},
    {path: '/crop/:id', element: <CropShow/>},
    {path: '/account/informations', element: <AccountInformations/>},
    {path: '/account/crop', element: <AccountCrop/>},
    {path: '/messages', element: <AccountMessages/>},
    {path: '/test', element: <Test/>},
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
