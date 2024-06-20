import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {LeafletMap} from "../../components/Maps/LeafletMap.jsx";
import {SimpleSwap} from "../../components/Cards/SimpleSwap.jsx";
import {useEffect, useState} from "react";

export function CropShow() {

    const [swaps, setSwaps] = useState({lot: [], few: [], done: []});
    const [markers, setMarkers] = useState([]);
    const [cropPosition, setCropPosition] = useState([]);


    useEffect(() => {

        setSwaps({
            lot: [
                {
                    name: "Poires",
                    image: "poire.svg"
                },
                {
                    name: "Pommes",
                    image: "pomme.svg"
                },
                {
                    name: "Tomates",
                    image: "tomate.svg"
                },
                {
                    name: "Carottes",
                    image: "carotte.svg"
                },
            ],
            few: [
                {
                    name: "Radis Long",
                    image: "radis_long.svg"
                },
                {
                    name: "Romarin",
                    image: "romarin.svg"
                },
                {
                    name: "Pastèque",
                    image: "pasteque.svg"
                },
                {
                    name: "Goyave",
                    image: "goyave.svg"
                },
            ],
            done: [
                {
                    name: "Cresson",
                    image: "cresson.svg"
                },
                {
                    name: "Cranberries",
                    image: "cranberries.svg"
                },
                {
                    name: "Concombre",
                    image: "concombre.svg"
                },
                {
                    name: "Cidre",
                    image: "cidre.svg"
                },
            ]
        })

        setCropPosition([44, 4]);

        setMarkers([
            {
                id: 1,
                icon: 'leaf-green',
                position: [44, 4],
                name: "User 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras ornare arcu.",
            },
            {
                id: 2,
                icon: 'leaf-green',
                position: [44.002, 4.005],
                name: "User 2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                id: 3,
                icon: 'leaf-orange',
                position: [44.005, 4.001],
                name: "User 3",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fusce id velit ut tortor.",
            }
        ]);
    }, []);


    return (
        <div>
            <NavigationMenu/>
            <div className="flex flex-wrap justify-around items-center">
                <div className="w-full md:w-1/2 p-6 font-title text-gray-700 space-y-4">
                    <h2 className="text-4xl font-extrabold ">Nom du Crop</h2>
                    <p className="text-xl font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed
                        non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
                        Cras
                        elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
                        porttitor,
                        orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis
                        semper.
                        Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in
                        risus
                        volutpat libero pharetra tempor.</p>

                    <div className="w-1/4 h-0.5 bg-gray-200"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="font-bold">Nom du propriétaire</div>
                            <div className="font-medium">Membre depuis le 16/03/2024</div>
                        </div>
                        <div className="space-x-2">
                            <div className="text-sm font-medium">Partager le crop</div>
                            <div className="flex flex-wrap justify-around">
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/facebook-new.png"
                                     alt="facebook"/>
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/twitter.png"
                                     alt="twitter"/>
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/linkedin.png"
                                     alt="linkedin"/>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-end gap-2">
                        <button
                            className="bg-red-500 text-white hover:bg-white hover:text-red-500 p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-red-500">
                            Signaler
                        </button>
                        <button
                            className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-blue-500">
                            Notifier
                        </button>
                        <button
                            className="bg-lime-500 text-white hover:bg-white hover:text-lime-500 p-2 rounded-md border-2 border-transparent hover:border-2 hover:border-lime-500">
                            Contacter
                        </button>
                    </div>

                </div>
                <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
                    <img className="w-full h-full object-cover"
                         src="https://images.unsplash.com/photo-1710587385309-f264b4d503cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                         alt="image"/>
                </div>
            </div>

            <div className="w-full h-0.5 bg-gray-200"></div>


            <div className="bg-lime-500 w-full p-8">
                <div className="w-full text-2xl lg:text-5xl font-title text-center text-white font-bold">
                    MES SWAPS A PROFUSION
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 p-5">
                    {swaps?.lot.map((lotSwap, lotSwapIndex) => (
                        <SimpleSwap
                            key={lotSwapIndex}
                            swap={lotSwap}>
                        </SimpleSwap>
                    ))}
                </div>
            </div>

            <div className="bg-orange-500 w-full p-8">
                <div className="w-full text-2xl lg:text-5xl font-title text-center text-white font-bold">
                    MES SWAPS BIENTOT DISPONIBLES
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 p-5">

                    {swaps?.few.map((fewSwap, fewSwapIndex) => (
                        <SimpleSwap
                            key={fewSwapIndex}
                            swap={fewSwap}>
                        </SimpleSwap>
                    ))}
                </div>
            </div>

            <div className="bg-red-500 w-full p-8">
                <div className="w-full text-2xl lg:text-5xl font-title text-center text-white font-bold">
                    MES SWAPS EPUISES
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 p-5">
                    {swaps?.done.map((DoneSwap, DoneSwapIndex) => (
                        <SimpleSwap
                            key={DoneSwapIndex}
                            swap={DoneSwap}>
                        </SimpleSwap>
                    ))}

                </div>
            </div>

            <div className="w-full flex justify-center h-[600px]">
                <LeafletMap
                    zoom-level={15}
                    center={cropPosition}
                    height={400}
                    markers={markers}>
                </LeafletMap>
            </div>
        </div>
    )

}