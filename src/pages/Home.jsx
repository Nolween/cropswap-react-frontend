import {NavigationMenu} from "../layouts/NavigationMenu.jsx";
import {SimpleCard} from "../components/Cards/SimpleCard.jsx";
import {LeafletMap} from "../components/Maps/LeafletMap.jsx";

export function Home() {

    const markers = [
        {
            position: [46.605, 1.09],
            icon: 'leaf-green',
            id: 1,
            description: 'Marker Description 1',
            name: 'Crop 1'
        },
        {
            position: [44.83, 2.85],
            icon: 'leaf-green',
            id: 2,
            description: 'Marker Description 2',
            name: 'Crop 2'
        },
    ]


    return (
        <div>
            <NavigationMenu isAuthenticated={false}/>

            <div className="text-3xl text-blue-600">
                CropSwap React Frontend
            </div>
            <SimpleCard/>
            <div className="flex justify-center h-[600px]">
                <LeafletMap markers={markers}/>
            </div>
        </div>

    )
}