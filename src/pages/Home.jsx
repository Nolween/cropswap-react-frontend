import {NavigationMenu} from "../layouts/NavigationMenu.jsx";

export function Home() {
    return (
        <div>
            <NavigationMenu isAuthenticated={false}/>

            <div className="text-3xl text-blue-600">
                CropSwap React Frontend
            </div>
        </div>

    )
}