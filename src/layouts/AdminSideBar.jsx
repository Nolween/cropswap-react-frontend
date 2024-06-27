import {Link} from "react-router-dom";
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';

export function AdminSideBar() {


    return (
        <div
            className="w-full md:h-full md:w-1/3 flex flex-wrap md:block border-r-2 border-gray-100 md:space-y-4 pt-8 items-start justify-around">
            <Link to="/admin/crop/index" className="p-3 flex flex-nowrap md:w-full hover:bg-blue-100 cursor-pointer">
                <div className="flex flex-nowrap items-center text-xl space-x-2">
                    <GrassOutlinedIcon size={40} className="text-orange-500"/>
                    <span className="font-bold text-sm md:text-2xl text-gray-600">CROPS</span>
                </div>
            </Link>
            <Link to="/admin/swap/index" className="p-3 flex flex-nowrap md:w-full hover:bg-blue-100 cursor-pointer">
                <div className="flex flex-nowrap items-center text-xl space-x-2">

                        <LocalFloristOutlinedIcon size={40} className="text-orange-500"/>
                    <span className="font-bold text-sm md:text-2xl text-gray-600">SWAPS</span>
                </div>
            </Link>
            <Link to="/admin/user/index" className="p-3 flex flex-nowrap md:w-full hover:bg-blue-100 cursor-pointer">
                <div className="flex flex-nowrap items-center text-xl space-x-2">
                    <AccountCircleOutlinedIcon size={40} className="text-orange-500"/>
                    <span className="font-bold text-sm md:text-2xl text-gray-600">UTILISATEURS</span>
                </div>
            </Link>
            <Link to="/admin/blog-article/index"
                  className="p-3 flex flex-nowrap md:w-full hover:bg-blue-100 cursor-pointer">
                <div className="flex flex-nowrap items-center text-xl space-x-2">
                    <NewspaperOutlinedIcon size={40} className="text-orange-500"/>
                    <span className="font-bold text-sm md:text-2xl text-gray-600">ARTICLES BLOG</span>
                </div>
            </Link>
        </div>
    )
}