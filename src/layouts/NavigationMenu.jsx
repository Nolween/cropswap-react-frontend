import {Link} from "react-router-dom";
import {useState} from "react";
import PropTypes from "prop-types";

// PROPS TYPES
NavigationMenu.propTypes = {
    isAuthenticated: PropTypes.bool
};

export function NavigationMenu({isAuthenticated }) {

    const [openedAccountActions, setOpenedAccountActions] = useState(false);

    const displayAccountActions = () => {
        setOpenedAccountActions(!openedAccountActions)
    }

    const logout = () => {
        console.log('logout')
    }


    return (
            <div
                className="bg-lime-500 text-black font-bold flex flex-wrap justify-around items-center gap-y-3 py-5 space-x-2 navigation-menu">
                <Link to="/" className="text-4xl cursor-pointer">
                    CROPSWAP
                </Link>
                <div className="space-x-4">
                    <Link to="/admin/dashboard" className="text-xl hover:text-white
                cursor-pointer">
                        ADMIN
                    </Link>
                    <Link to="/blog" className="text-xl hover:text-white cursor-pointer">
                        LE BLOG
                    </Link>

                    <Link to="/crop" className="text-xl hover:text-white cursor-pointer">
                        TROUVER UN CROP
                    < /Link>
                </div>
                {isAuthenticated ? (
                    <Link to="/login"
                          className="text-xl bg-black text-white p-3 rounded-xl hover:bg-white hover:text-black">
                        CONNEXION
                    < /Link>
                ) : (
                    <div className="relative">
                        <button
                            className="text-xl bg-white text-orange-500 p-3 rounded-lg hover:bg-orange-500 hover:text-white border-2"
                            onClick={displayAccountActions}>
                            MON COMPTE

                        </button>
                        {openedAccountActions ? (
                            <div
                                className="z-40 bg-orange-500 text-white text-xl font-bold absolute top-16 right-0 rounded-lg p-3 space-y-2 border-2">
                                <div><Link to="/messages" className="hover:text-lime-500">MESSAGERIE</Link>
                                </div>
                                <div><Link to="/account/informations" className="hover:text-lime-500">MES INFOS</Link>
                                </div>
                                <div><Link to="/account/crop" className="hover:text-lime-500">MON CROP</Link>
                                </div>
                                <div onClick={logout}
                                     className="hover:text-lime-500"> DECONNECTER
                                </div>
                            </div>
                        ) : null}
                    </div>

                )}

            </div>
    )
}