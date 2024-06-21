import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {useTextTools} from "../../hooks/useTextTools.jsx";
import {LeafletMap} from "../../components/Maps/LeafletMap.jsx";
import {AdminModal} from "../../components/Modals/AdminModal/AdminModal.jsx";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";


export function AccountInformations() {

    const {validateEmail, imagePathResource} = useTextTools();

    const [isLoaded, setIsLoaded] = useState(false);
    const [informations, setInformations] = useState();
    const [isOpenedEditionModal, setIsOpenedEditionModal] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [confirmedDeletion, setConfirmedDeletion] = useState(false);
    const [editInformations, setEditInformations] = useState({
        image: 'empty.svg',
        imageFile: null,
        name: '',
        oldMail: '',
        newMail: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const confirmUserDelete = async () => {
        // await axios.delete(`/account/${informations.value.id}`).then(response => {
        //     if (response.data.success) {
        //         window.location.href = route('home');
        //     }
        // }).catch(error => {
        //     console.log(error.response.data);
        // });
    }

    const updateInformations = async () => {

    }

    const handleUpdateIsOpenedEditionModal = (value) => {
        setIsOpenedEditionModal(value);
    }

    const handleUpdateDeleteModalOpened = (value) => {
        setDeleteModalOpened(value);
    }


    const closeEditionModal = () => {
        setIsOpenedEditionModal(false);
        setEditInformations(...editInformations, informations.image);
    }

    const formErrors = useMemo(() => {
        let errors = {
            name: false,
            newMail: false,
            oldPassword: false,
            newPassword: false,
            confirmPassword: false,
            image: false,
        };
        if (!editInformations.image || editInformations.imageFile?.size > 2000000) {
            errors.image = true;
        }
        if (!editInformations.name) {
            errors.name = true;
        }
        // If newMail is not an email
        if (editInformations.newMail && !validateEmail(editInformations.newMail)) {
            errors.newMail = true;
        }
        if (editInformations.newPassword && editInformations.confirmPassword && !editInformations.oldPassword) {
            errors.oldPassword = true;
        }
        if (editInformations.oldPassword && !editInformations.newPassword) {
            errors.newPassword = true;
        }
        if (editInformations.newPassword !== editInformations.confirmPassword) {
            errors.confirmPassword = true;
        }
        return errors;
    }, [editInformations]);

    const unValidForm = useMemo(() => {
        return Object.values(formErrors).some(error => error === true);
    }, [formErrors]);

    const updateImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setInformations({...informations, image: URL.createObjectURL(event.target.files[0])});
            setInformations({...informations, imageFile: event.target.files[0]});
        }
    }


    useEffect(() => {
        setInformations({
            user: {
                name: 'John Doe',
                image: '1.svg',
                email: 'bla@bla.com',
            },
            role: 'user',
            inscriptionDate: new Date(),
            lastConnection: new Date(),
            cropName: 'Mon crop',
            cropPosition: [48.8566, 2.3522],
            marker: [{
                id: 1,
                position: [48.8566, 2.3522],
                title: 'Mon crop',
                description: 'Description de mon crop'
            }],
            id: 1,
        })
        setEditInformations({...editInformations, name: informations?.user.name});
        setEditInformations({...editInformations, image: informations?.user.image});
        setEditInformations({...editInformations, oldMail: informations?.user.email});
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative">
            <NavigationMenu/>

            <div className="h-full flex flex-wrap">
                <div className="w-full bg-gray-50 overflow-auto h-screen md:pb-40">
                    <div className="w-full text-xl md:text-5xl font-mono text-orange-500 border-b-2 p-3">
                        MON COMPTE
                    </div>

                    <div className="w-full bg-orange-500 flex flex-wrap justify-between items-center">
                        <img src={imagePathResource(editInformations.image, 'user')} alt="User image"
                             className="w-1/3 object-cover"/>
                        <div className="w-2/3 text-start p-3 space-y-2">
                            <div className="w-full">
                                <div className="text-white font-bold text-3xl">
                                    {informations?.name}
                                </div>
                                <div className="text-white font-bold text-2xl">{informations?.email}</div>
                                <div className="text-gray-200 font-bold text-xl">
                                    {informations?.role === 'user' ? 'Utilisateur' : 'Administrateur'}
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="text-white">Inscription le {
                                    informations?.inscriptionDate.toLocaleDateString()
                                }
                                </div>
                                <div className="text-white">Dernière connexion le
                                    {informations?.lastConnection.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex p-3 justify-center gap-2">
                        <button onClick={() => handleUpdateIsOpenedEditionModal(true)}
                                className="w-1/3 bg-blue-500 text-white p-2 rounded-lg text-2xl font-bold">Modifier
                        </button>
                        <Link to={`/crop/${informations?.marker[0].id}`}
                              className="w-1/3 bg-lime-500 text-white p-2 rounded-lg text-2xl font-bold text-center">Fiche
                        </Link>
                        <button onClick={() => handleUpdateDeleteModalOpened(true)}
                                className="w-1/3 bg-red-500 text-white p-2 rounded-lg text-2xl font-bold">Supprimer
                        </button>
                    </div>

                    <div className="p-3 w-full justify-center mb-3">
                        <div className="text-center text-3xl text-lime-500 font-bold w-full mb-4">
                            {informations?.cropName}
                        </div>

                        <div className="w-full flex justify-center h-[400px]">
                            <LeafletMap
                                zoom-level={15}
                                center={informations?.cropPosition}
                                markers={informations?.marker}>

                            </LeafletMap>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenedEditionModal ? (
                <AdminModal title="Editer les informations"
                            onClose={() => handleUpdateIsOpenedEditionModal(false)}
                            body={<div className="w-full">
                                <div>
                                    <label htmlFor="image"
                                           className={formErrors.image ? 'text-red-500' : 'text-gray-600'}>Image de
                                        l'article
                                    </label>
                                    <input type="file" id="image" name="image" onChange={updateImage}
                                           className="w-full p-2 border-2 border-gray-200 rounded-md hidden"/>
                                    <label htmlFor="image" className="text-gray-600">
                                        <img src={imagePathResource(editInformations?.image ?? 'empty.svg', 'user')}
                                             alt="Image principale de l'article"
                                             className="max-w-80 max-h-80 object-cover mx-auto mb-2 cursor-pointer"/>
                                    </label>
                                </div>

                                <div className="gap-2 flex flex-wrap mb-2">
                                    <label htmlFor="informationName"
                                           className={formErrors.name ? 'text-red-500 w-full' :
                                               'text-gray-600 w-full'}>Nom
                                    </label>
                                    <input name="informationName" type="text" value={editInformations.name}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               name: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 "/>
                                </div>

                                <div className="gap-2 flex flex-wrap">
                                    <label htmlFor="informationEmail" className="text-gray-500">Ancien Email</label>
                                    <input disabled name="informationEmail" type="text"
                                           value={editInformations.oldMail}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               oldMail: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 bg-gray-100"/>
                                </div>

                                <div className="gap-2 flex flex-wrap">
                                    <label htmlFor="informationEmail"
                                           className={formErrors.newMail ? 'text-red-500' :
                                               'text-gray-600'}>Nouvel Email
                                    </label>
                                    <input name="informationEmail" type="text" value={editInformations.newMail}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               newMail: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 "/>
                                </div>

                                <div className="gap-2 flex flex-wrap">
                                    <label htmlFor="informationEmail"
                                           className={formErrors.oldPassword ? 'text-red-500' : 'text-gray-600'}>
                                        Ancien mot de passe</label>
                                    <input name="informationEmail" type="password"
                                           value={editInformations.oldPassword}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               oldPassword: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 "/>
                                </div>

                                <div className="gap-2 flex flex-wrap">
                                    <label htmlFor="informationEmail"
                                           className={formErrors.newPassword ? 'text-red-500' : 'text-gray-600'}>
                                        Nouveau mot de passe
                                    </label>
                                    <input name="informationEmail" type="password"
                                           value={editInformations.newPassword}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               newPassword: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 "/>
                                </div>

                                <div className="gap-2 flex flex-wrap">
                                    <label htmlFor="informationEmail"
                                           className={formErrors.confirmPassword ? 'text-red-500' :
                                               'text-gray-600'}>
                                        Confirmation mot de passe
                                    </label>
                                    <input name="informationEmail" type="password"
                                           value={editInformations.confirmPassword}
                                           onChange={e => setEditInformations(prevState => ({
                                               ...prevState,
                                               confirmPassword: e.target.value
                                           }))}
                                           className="w-full p-2 border-2 text-gray-500 rounded-md border-gray-200 "/>
                                </div>
                            </div>}
                            footer={<div
                                className="w-full flex justify-end space-x-2">
                                < button
                                    className="p-2 bg-gray-300 text-white rounded-lg text-xl font-bold hover:bg-white hover:text-gray-300 hover:border-gray-300 border-2 border-transparent"
                                    onClick={closeEditionModal}> Annuler
                                < /button>
                                <button
                                    disabled={unValidForm}
                                    className={`p-2 text-white rounded-lg text-xl font-bold border-2 border-transparent ${unValidForm ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-500'}`}
                                    onClick={updateInformations}> Envoyer
                                < /button>
                            </div>}>
                </AdminModal>
            ) : null}
            {
                deleteModalOpened ? (
                    <AdminModal title="Bannir l'utilisateur"
                                onClose={() => handleUpdateDeleteModalOpened(false)}
                                body={
                                    <div className="w-full flex items-center space-x-2">
                                        <input checked={confirmedDeletion} type="checkbox"
                                               onChange={e => setConfirmedDeletion(e.target.checked)}
                                               className="w-6 h-6 border-2 border-gray-300 rounded-md cursor-pointer"
                                               id="confirmDelete"/>
                                        <label htmlFor="confirmDelete" className="text-gray-500 cursor-pointer">
                                            Je confirme la suppression de mon compte
                                        </label>
                                    </div>}
                                footer={<div
                                    className="w-full flex justify-end space-x-2">
                                    < button
                                        className="p-2 border-2 border-gray-300 hover:border-transparent text-gray-300 hover:bg-gray-300 hover:text-white bg-white rounded-lg text-xl font-bold"
                                        onClick={() => handleUpdateDeleteModalOpened(false)}>
                                        Annuler
                                    < /button>
                                    <button disabled={!confirmedDeletion}
                                            className={confirmedDeletion ? 'border-red-300 bg-red-500 text-white hover:bg-white hover:text-red-500 p-2 border-2 rounded-lg text-xl font-bold' : 'bg-white text-gray-500 hover:bg-gray-500 hover:text-white border-gray-300 p-2 border-2 rounded-lg text-xl font-bold'}
                                            onClick={confirmUserDelete}>
                                        Supprimer
                                    < /button>
                                </div>}>
                    </AdminModal>
                ) : null}
        </div>
    );
}