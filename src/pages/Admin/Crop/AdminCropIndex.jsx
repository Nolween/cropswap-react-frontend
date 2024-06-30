import {NavigationMenu} from "../../../layouts/NavigationMenu.jsx";
import {AdminSideBar} from "../../../layouts/AdminSideBar.jsx";
import {AdminModal} from "../../../components/Modals/AdminModal/AdminModal.jsx";
import {ContextMenuButton} from "../../../components/Buttons/ContextMenuButton/ContextMenuButton.jsx";
import {useMemo, useState} from "react";
import {BackOfficeTable} from "../../../components/Table/BackOfficeTable.jsx";

export function AdminCropIndex() {

    const [openBanUserModal, setOpenBanUserModal] = useState(false);
    const [userToBan, setUserToBan] = useState(null);
    const [crops, setCrops] = useState([
        {
            id: 1,
            name: 'Crop 1',
            image: '/images/crops/empty.svg',
            user: 'Jean Dupont',
            reports: 5,
            userId: 1,
        },
        {
            id: 2,
            name: 'Crop 2',
            image: '/images/crops/empty.svg',
            user: 'User 2',
            reports: 1,
            userId: 2,
        }

    ]);

    const [users, setUsers] = useState([]);

    const [filters, setFilters] = useState({
        cropSearch: '',
        userId: 0,
        minReport: null,
    });

    const [headers, setHeaders] = useState([
        {column: 'id', name: 'ID', type: 'string'},
        {column: 'name', name: 'Nom', type: 'string'},
        {column: 'image', name: 'Image', type: 'image'},
        {column: 'user', name: 'Utilisateur', type: 'string'},
        {column: 'reports', name: 'Sign.', type: 'number'},
        {column: 'userId', name: 'Utilisateur', type: 'string', hidden: true},
    ]);

    const [actions, setActions] = useState([
        {
            icon: 'SearchOutlined',
            color: 'blue',
            method: 'seeCrop'
        },
        {
            icon: 'DoDisturbAltOutlined',
            color: 'red',
            method: 'openBanModal',
        }
    ]);


    const filteredRows = useMemo(() => {
        return crops.filter(row => {
            let returnRow = true;
            if (filters.cropSearch.trim().length > 0) {
                const nameFind = row.name.toLowerCase().includes(filters.cropSearch.toLowerCase());
                const userFind = row.user.toLowerCase().includes(filters.cropSearch.toLowerCase());
                if (!nameFind && !userFind) {
                    return false;
                }
            }
            if (filters.userId && filters.userId !== '') {
                returnRow = row.userId === parseInt(filters.userId);
                if (!returnRow) {
                    return false;
                }
            }
            if (filters.minReport && filters.minReport !== '') {
                returnRow = row.reports >= parseInt(filters.minReport);
                if (!returnRow) {
                    return false;
                }
            }
            return returnRow;
        });
    }, [crops, filters]);

    const computedUsersList = useMemo(() => {

        //  Get the list of users from the rows and do not duplicate if the user is already in the list
        return crops.reduce((acc, row) => {
            if (!acc.find(user => user.userId === row.userId)) {
                acc.push({userId: row.userId, name: row.user});
            }
            return acc;
        }, []);
    }, [crops]);


    const activate = (action) => {
        if (action?.method === 'seeCrop') {
            seeCrop(action.rowIndex);
        } else if (action?.method === 'openBanModal') {
            openBanModal(action.rowIndex);
        }
    };

    const seeCrop = (rowIndex) => {
        // Get the crop from the rows
        const cropToSee = filteredRows[rowIndex];
        // Visit the crop page in a new tab
        window.open(`/crop/${cropToSee.id}`, '_blank');
    };

    const openBanModal = (rowIndex) => {
        setUserToBan(filteredRows[rowIndex]);
        setOpenBanUserModal(true);
    };

    const banUser = async () => {
        if (userToBan) {
            // await axios.delete(`/account/${userToBan.value.userId}`).then(response => {
            //     if (response.data.success) {
            setCrops(crops.filter(row => row.userId !== userToBan.userId));
            setOpenBanUserModal(false);
            //     }
            // }).catch(error => {
            //     console.log(error);
            // });
        }
    };

    const updateFilters = (event, filter) => {
        setFilters({...filters, [filter]: event.target.value});
    };

    const resetUserToBan = () => {
        setOpenBanUserModal(false);
        setUserToBan(null);
    }


    return (
        <div className="md:h-screen md:overflow-hidden">
            <NavigationMenu/>
            <div className="h-full flex flex-wrap">
                <AdminSideBar></AdminSideBar>
                <div className="w-full md:w-2/3 bg-gray-50">
                    <div className="w-full text-xl md:text-5xl font-mono text-orange-500 border-b-2 p-3">
                        CROPS
                    </div>
                    <div className="w-full flex justify-center items-center p-2 space-x-2">
                        <div className="">
                            <ContextMenuButton content={<div>
                                <div className="text-gray-500">FILTRES</div>
                                <div className="w-60 space-y-2">
                                    <select value={filters['userId'] || ''}
                                            onChange={(event) => updateFilters(event, 'userId')}
                                            className="w-full p-2 border-2 border-gray-200 rounded-md">
                                        <option value="">Tous les utilisateurs</option>
                                        {computedUsersList.map((user, userIndex) => (
                                            <option key={userIndex}
                                                    value={user.userId}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <input value={filters.minReport || ''} type="number" id="min-report"
                                               onChange={(event) => updateFilters(event, 'minReport')}
                                               placeholder="Singnalements minimum"
                                               className="w-full border-2 border-gray-200 rounded-md"/>
                                    </div>
                                </div>
                            </div>}/>
                        </div>
                        <div className="w-1/2">
                            <input type="text" placeholder="Rechercher un CROP"
                                   className="w-full p-2 border-2 border-gray-200 rounded-md"
                                   onChange={(event) => updateFilters(event, 'cropSearch')}
                                   value={filters.cropSearch}/>
                        </div>
                    </div>
                    <div className="w-full p-2 h-screen overflow-auto md:pb-80">
                        <BackOfficeTable onActionEmitted={activate}
                                         headers={headers}
                                         rows={filteredRows}
                                         per-page={10}
                                         onShow={(rowIndex) => seeCrop(rowIndex)}
                                         actions={actions}/>
                    </div>

                </div>
            </div>
            {
                openBanUserModal && userToBan ? (
                    <AdminModal title="Bannissement du l'utilisateur"
                                body={
                                    <div className="text-center">
                                        <p>Êtes-vous sûr de vouloir bannir {userToBan.user} ?</p>
                                    </div>
                                } footer={
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={banUser} type="button"
                                className="p-2 rounded-lg text-md font-medium border-2 border-red-500 text-red-500 hover:text-white
                                        hover:bg-red-500 hover:border-transparent">
                                Oui
                            </button>
                            <button onClick={resetUserToBan} type="button"
                                    className="p-2 rounded-lg text-md font-medium border-2 border-lime-500 text-lime-500 hover:text-white hover:bg-lime-500 hover:border-transparent">
                                Non
                            </button>
                        </div>
                    }/>
                ) : null}
        </div>
    )
}