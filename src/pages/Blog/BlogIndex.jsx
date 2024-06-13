import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";


export function BlogIndex() {
    return (
        <div>
            <NavigationMenu isAuthenticated={false}/>

            <div className="text-3xl text-blue-600">
                CropSwap BLOG
            </div>
        </div>
    )
}