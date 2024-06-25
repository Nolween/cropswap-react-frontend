import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {useState, useMemo, useEffect} from "react";
import {AdminModal} from "../../components/Modals/AdminModal/AdminModal.jsx";
import {Autocomplete} from "../../components/Form/Autocomplete.jsx";
import {SimpleSwap} from "../../components/Cards/SimpleSwap.jsx";

export function AccountCrop() {

    const [crop, setCrop] = useState();
    const [selectedTab, setSelectedTab] = useState('informations');
    const [form, setForm] = useState({
        cropName: '',
        description: '',
        image: '',
        imageFile: null
    });
    const [selectedSwaps, setSelectedSwaps] = useState([]);
    const [swapList, setSwapList] = useState([]);

    const [userSwaps, setUserSwaps] = useState([]);

    const validForm = useMemo(() => {
        return form.cropName.length > 0 && form.description.length > 0 && form.image !== '/images/crop/empty.svg';
    }, [form]);


    const updateCrop = async () => {
        const formData = new FormData();
        formData.append('name', form.cropName);
        formData.append('description', form.description);
        formData.append('image', form.image);
        formData.append('imageFile', form.imageFile);
        formData.append('_method', 'PUT');

        await fetch(`/account/crop/${crop.id}`, formData).then(response => {
            if (response.data.success) {
                console.log('Crop updated');
            }
        }).catch(error => {
            console.log(error.response.data);
        });


    };

    const computedSwapList = useMemo(() => {
    //     Filter the swaps that are not in the userSwaps
        return swapList.filter(swap => !userSwaps.find(userSwap => userSwap.id === swap.id));
    }, [userSwaps]);


    const updateImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setForm({...form, image: URL.createObjectURL(event.target.files[0]),imageFile: event.target.files[0]});
        }
    };

    const swapActions = {
        updateLot: "A profusion",
        updateFew: "Peu Nombreux",
        updateNone: "Ca pousse!",
        delete: 'Supprimer'
    };


    const updateSwapQuantity = async (swapId, quantity) => {
        await updateSwapBack(swapId, quantity).then(
            response => {
                if (response) {
                    // Find if the swap is in the userSwaps
                    const swap = userSwaps.find(swap => swap.id === swapId);
                    if (swap) {
                        swap.quantity = quantity;
                    } else {
                        let swapInList = swapList.find(swap => swap.id === swapId);
                        swapInList = {quantity, crop_id: crop.id, id: swapId, image: swapInList.image, name: swapInList.name};
                        setUserSwaps([...userSwaps, swapInList]);
                    }
                    setSelectedSwaps([]);
                }
            }
        )
    };


    const updateSwapBack = async (swapId, quantity) => {
        // const cropId = crop.id;
        // // Submit to the back
        // return await fetch(`/account/crop/${cropId}/swap`, {
        //     method: 'POST',
        //     body: {cropId, swapId, quantity}
        // })
        //     .then(response => {
        //         if (response.data.success) {
        //             return true;
        //         }
        //     }).catch(error => {
        //         console.log(error.response.data);
        //         return false;
        //     });
        return true;
    }


    const computedFilteredSwaps = useMemo(() => {
        // 3 arrays of swaps according to quantity
        const noSwap = userSwaps.filter(swap => swap.quantity === 0);
        const fewSwap = userSwaps.filter(swap => swap.quantity === 1);
        const lotSwap = userSwaps.filter(swap => swap.quantity === 2);

        // Sorting the arrays by name
        noSwap.sort((a, b) => a.name.localeCompare(b.name));
        fewSwap.sort((a, b) => a.name.localeCompare(b.name));
        lotSwap.sort((a, b) => a.name.localeCompare(b.name));

        return {
            noSwap,
            fewSwap,
            lotSwap
        };
    }, [userSwaps]);

    const handleUpdateSelectedSwaps = (swaps) => {
    //     Push the selected swaps to the selectedSwaps array
        setSelectedSwaps([...selectedSwaps, swaps])
    }


    const actionSwap = async (action, params) => {
        const swapId = params.id;
        let quantity = null;

        switch (action) {
            case 'updateNone':
                quantity = 0;
                break;
            case 'updateFew':
                quantity = 1;
                break;
            case 'updateLot':
                quantity = 2;
                break;
        }


        await updateSwapBack(swapId, quantity).then(
            response => {
                if (response) {
                    if (action === 'delete') {
                        userSwaps.findIndex((swap, index) => {
                            if (swap.id === params.id) {
                                let deletedSwaps = userSwaps.filter((swap, swapIndex) => swap.id !== params.id);
                                setUserSwaps(deletedSwaps);
                            }
                        });
                    } else {// Find swap in userSwaps
                        let swapIndex = userSwaps.findIndex(swap => swap.id === swapId);
                        if (swapIndex !== -1) {
                            // Update the quantity
                            let updatedUserSwaps = [...userSwaps];
                            updatedUserSwaps[swapIndex] = {...updatedUserSwaps[swapIndex], quantity: quantity};
                            setUserSwaps(updatedUserSwaps);
                        } else {
                            // Add pivot data to the swap
                            let swapInList = swapList.find(swap => swap.id === swapId);
                            if (swapInList) {
                                setUserSwaps([...userSwaps, {quantity, crop_id: crop.id, id: swapId, image: swapInList.image, name: swapInList.name}]);
                            }
                        }
                    }
                }
                setSelectedSwaps([]);
            }
        );

    };


    const handleSelectTab = (tab) => {
        setSelectedTab(tab);
    }

    const handleResetSelectedSwap = () => {
        setSelectedSwaps([]);
    }

    useEffect(() => {
        setCrop({
            id: 1,
            name: 'Crop 1',
            description: 'Description of crop 1',
            image: '/images/crop/1.jpg'

        })
        setSwapList([
                {
                    id: 1,
                    name: 'Abricot',
                    image: 'abricot.svg'
                },
                {
                    id: 2,
                    name: 'Banane',
                    image: 'banane.svg'
                },
                {
                    id: 3,
                    name: 'Lait',
                    image: 'lait.svg'
                },
                {
                    id: 4,
                    name: 'Fraise des bois',
                    image: 'fraise_des_bois.svg'
                },
                {
                    id: 5,
                    name: 'Pistaches',
                    image: 'pistaches.svg'
                },
                {
                    id: 6,
                    name: 'Ail',
                    image: 'ail.svg',
                }
            ]
        )

        setUserSwaps([
            {
                id: 1,
                quantity: 0,
                name: 'Abricot',
                image: 'abricot.svg'
            },
            {
                id: 2,
                quantity: 1,
                name: 'Banane',
                image: 'banane.svg'
            },
            {
                id: 3,
                quantity: 2,
                name: 'Lait',
                image: 'lait.svg'
            },
            {
                id: 4,
                quantity: 0,
                name: 'Fraise des bois',
                image: 'fraise_des_bois.svg'
            },
            {
                id: 5,
                quantity: 1,
                name: 'Pistaches',
                image: 'pistaches.svg'
            },
        ])
    }, []);


    return (
        <div className="md:h-screen relative">
            <NavigationMenu/>

            <div className="h-full flex flex-wrap">

                <div className="w-full bg-gray-50 overflow-auto h-screen md:pb-40">
                    <div
                        className="w-full flex items-center justify-between text-xl md:text-5xl text-orange-500 border-b-2 p-3">
                        <div className="font-mono">MON CROP</div>
                        <div className="space-x-4 font-title text-2xl">
                            <button onClick={() => handleSelectTab('informations')}
                                    className={selectedTab === 'informations' ? 'text-lime-500' : 'text-gray-500'}>
                                INFORMATIONS
                            </button>
                            <button onClick={() => handleSelectTab('swaps')}
                                    className={selectedTab === 'swaps' ? 'text-lime-500' : 'text-gray-500'}>
                                SWAPS
                            </button>
                        </div>
                    </div>

                    {selectedTab === 'informations' ? (
                        <div className="w-full">

                            <div className="w-full p-2">
                                <label htmlFor="name" className="text-gray-600">Nom du crop</label>
                                <input value={form.cropName} type="text" id="name" name="name"
                                       onChange={(event) => {
                                           setForm({...form, cropName: event.target.value})
                                       }}
                                       className="w-full p-2 border-2 border-gray-200 rounded-md"/>
                            </div>

                            <div className="w-full p-2">
                                <label htmlFor="description" className="text-gray-600">Description</label>
                                <textarea value={form.description} id="description" name="description"
                                          rows="8"
                                          onChange={(event) => {
                                              setForm({...form, description: event.target.value})
                                          }}
                                          className="w-full p-2 border-2 border-gray-200 rounded-md"></textarea>
                            </div>

                            <div className="w-full p-2">
                                <span className="text-gray-600">Image du swap</span>
                                <input type="file" id="image" name="image" onChange={updateImage}
                                       className="w-full p-2 border-2 border-gray-200 rounded-md hidden"/>
                                <label htmlFor="image" className="text-gray-600">
                                    <img src={form.image} alt="Image du swap"
                                         className="max-w-80 max-h-80 object-cover mx-auto mb-2 cursor-pointer"/>
                                </label>
                            </div>

                            <div className="w-full p-2">
                                <button onClick={updateCrop}
                                        className={`w-full p-2 rounded-lg  text-md font-medium border-2  cursor-pointer ${validForm ? 'text-lime-500 border-lime-500 hover:text-white hover:bg-lime-500 hover:border-transparent' : 'bg-white text-gray-500 hover:bg-gray-500 hover:text-white'}`}>
                                    Mettre à jour
                                </button>
                            </div>
                        </div>) : selectedTab === 'swaps' ? (
                        <div>
                            <div className="w-full">

                                <div className="w-full p-2">
                                    <Autocomplete values={computedSwapList} selectedValues={selectedSwaps}
                                                  onUpdateSelectedValues={handleUpdateSelectedSwaps}
                                                  placeholder="Recherchez un swap"/>
                                </div>

                                {computedFilteredSwaps.lotSwap.length > 0 ? (
                                    <div className="w-full p-4 bg-lime-500 text-3xl">
                                        <div className="text-2xl font-bold text-white mb-3">MES SWAPS A PROFUSION</div>
                                        <div className="flex flex-wrap justify-evenly gap-2">
                                            {computedFilteredSwaps.lotSwap.map((swap, swapIndex) => (
                                                <div key={swapIndex}
                                                     className=" p-2 rounded-md font-bold">
                                                    <SimpleSwap swap={swap} actions={swapActions}
                                                                onActionEmitted={(event) => actionSwap(event, {id: swap.id})}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                                {computedFilteredSwaps.fewSwap.length > 0 ? (
                                    <div className="w-full p-4 bg-orange-500 text-3xl">
                                        <div className="text-2xl font-bold text-white mb-3">MES SWAPS PEU NOMBREUX
                                        </div>
                                        <div className="flex flex-wrap justify-evenly gap-2">
                                            {computedFilteredSwaps.fewSwap.map((swap, swapIndex) => (
                                                <div key={swapIndex}
                                                     className=" p-2 rounded-md font-bold">
                                                    <SimpleSwap swap={swap} actions={swapActions}
                                                                onActionEmitted={(event) => actionSwap(event, {id: swap.id})}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {computedFilteredSwaps.noSwap.length > 0 ? (
                                    <div className="w-full p-4 bg-red-500 text-3xl">
                                        <div className="text-2xl font-bold text-white mb-3">CA POUSSE!</div>
                                        <div className="flex flex-wrap justify-evenly gap-2">
                                            {computedFilteredSwaps.noSwap.map((swap, swapIndex) => (
                                                <div key={swapIndex}
                                                     className=" p-2 rounded-md font-bold">
                                                    <SimpleSwap
                                                        swap={swap} actions={swapActions}
                                                        onActionEmitted={(event) => actionSwap(event, {id: swap.id})}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>) : null}
                </div>
            </div>

            {selectedSwaps.length > 0 ? (
                <AdminModal onClose={handleResetSelectedSwap} title="Quantité à échanger"
                            body={
                                <div className="w-full">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {selectedSwaps.map((swap, swapIndex) => (
                                            <div key={swapIndex}
                                                 className="text-gray-700 p-2 rounded-md font-bold">
                                                <div className="text-2xl font-bold mb-3 w-full">
                                                    Quelle quantité de {swap.name} avez vous à échanger ?
                                                </div>
                                                <img src={`/images/food/${swap.image}`} alt="Swap image"
                                                     className="w-20 h-20 object-cover mx-auto mb-2"/>
                                                <div
                                                    className="mx-auto w-full text-center text-2xl flex flex-wrap justify-around gap-2">
                                                    <button
                                                        onClick={() => updateSwapQuantity(swap.id, 0)}
                                                        className="bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white hover:border-transparent text-lg p-2 rounded-md">
                                                        Pas du tout
                                                    </button>
                                                    <button
                                                        onClick={() => updateSwapQuantity(swap.id, 1)}
                                                        className="bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white hover:border-transparent text-lg p-2 rounded-md">
                                                        Un peu
                                                    </button>
                                                    <button
                                                        onClick={() => updateSwapQuantity(swap.id, 2)}
                                                        className="bg-white text-lime-500 border-2 border-lime-500 hover:bg-lime-500 hover:text-white hover:border-transparent text-lg p-2 rounded-md">
                                                        Beaucoup !
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>}>
                </AdminModal>
            ) : null}
        </div>
    )

}