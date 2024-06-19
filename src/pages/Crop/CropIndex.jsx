import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {Autocomplete} from "../../components/Form/Autocomplete.jsx";
import {LeafletMap} from "../../components/Maps/LeafletMap.jsx";
import {useEffect, useMemo, useState} from "react";

export function CropIndex() {

    const [swapSearch, setSwapSearch] = useState('');
    const [selectedSwaps, setSelectedSwaps] = useState([]);
    const [swapList, setSwapList] = useState([]);
    const [center, setCenter] = useState([46.605, 1.09]);
    const [zoomLevel, setZoomLevel] = useState(6);
    const [markers, setMarkers] = useState([]);

    const updateSelectedSwaps = (selectedSwap, toAdd) => {
        if (toAdd) {
            // Is the swap id already in the selectedSwaps array?
            if (!selectedSwaps.includes(selectedSwap)) {
                setSelectedSwaps(prevSwaps => [...prevSwaps, selectedSwap]);
            } else {
                const filteredSwaps = selectedSwaps.filter(swap => swap.id !== selectedSwap.id);
                setSelectedSwaps(filteredSwaps);
            }
        } else {
            const filteredSwaps = selectedSwaps.filter(swap => swap.id !== selectedSwap);
            setSelectedSwaps(filteredSwaps);
        }
    }

    useEffect(() => {


        setMarkers([
            {
                position: [46.605, 1.09],
                icon: 'leaf-green',
                id: 1,
                description: 'Marker Description 1',
                name: 'Crop 1',
                swaps: [1, 2, 3]
            },
            {
                position: [44.83, 2.85],
                icon: 'leaf-green',
                id: 2,
                description: 'Marker Description 2',
                name: 'Crop 2',
                swaps: [1, 2, 4]
            },
            {
                position: [43.83, 3.85],
                icon: 'leaf-green',
                id: 3,
                description: 'Marker Description 3',
                name: 'Crop 3',
                swaps: [1, 3, 5]
            },
            {
                position: [42.83, 4.85],
                icon: 'leaf-green',
                id: 4,
                description: 'Marker Description 4',
                name: 'Crop 4',
                swaps: [1, 4, 5]
            },
            {
                position: [41.83, 5.85],
                icon: 'leaf-green',
                id: 5,
                description: 'Marker Description 5',
                name: 'Crop 5',
                swaps: [2, 3, 4]
            }
        ]);

        setSwapList([
            {
                id: 1,
                name: 'Swap 1'
            },
            {
                id: 2,
                name: 'Swap 2'
            },
            {
                id: 3,
                name: 'Swap 3'
            },
            {
                id: 4,
                name: 'Swap 4'
            },
            {
                id: 5,
                name: 'Swap 5'
            }
        ]);


        // fetch('/crops').then(response => {
        //     setSwapList(response.data);
        // });
    }, []);


    const filteredMarkers = useMemo(() => {
        if (selectedSwaps.length === 0) {
            return markers;
        } else {
            const newFilteredMarkers = markers.filter(marker => {
                // get id of the selectedSwaps array
                const selectedSwapsIds = selectedSwaps.map(swap => swap.id);
                // Check if the marker has at least one swap in the selectedSwaps array
                return marker.swaps.some(swap => selectedSwapsIds.includes(swap));

            });
            return newFilteredMarkers;
        }
    }, [selectedSwaps, markers]);


    return (
        <div className="lg:h-screen lg:overflow-hidden">
            <NavigationMenu/>
            <div className="flex flex-wrap h-full">

                <div className="w-full flex flex-wrap lg:w-1/3 overflow-auto bg-orange-500">
                    <div className="w-full py-8 px-4">
                        <div className={`w-full p-4 ${selectedSwaps.length === 0 ? 'min-h-52 lg:min-h-auto' : ''}`}>
                            <Autocomplete search={swapSearch} values={swapList}
                                          placeholder={'Sélectionner des swaps'}
                                          selectedValues={selectedSwaps}
                                          isMultiple={true}
                                          onUpdatedSelectedValues={(swap) => updateSelectedSwaps(swap, true)}/>
                        </div>

                        {selectedSwaps.length !== 0 ? (
                            <div className="w-full p-5">
                                <div className="text-2xl font-bold mb-3">SWAPS SELECTIONNES</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSwaps.map((swap, swapIndex) => (
                                        <div
                                            key={swapIndex}
                                            className="bg-blue-500 text-white p-2 rounded-md font-bold">
                                            {swap.name}
                                            <span
                                                onClick={() => updateSelectedSwaps(swap.id, false)}
                                                className="cursor-pointer px-1">X
                                        </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                    </div>
                </div>

                <div className="w-full lg:w-2/3 text-5xl font-title font-extrabold text-center">
                    <div className="w-full h-screen lg:h-full">
                        <LeafletMap
                            center={center} ZoomLevel={zoomLevel} markers={filteredMarkers}>
                        </LeafletMap>
                    </div>
                </div>
            </div>
        </div>
    )
}
