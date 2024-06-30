import {useState, useRef, useEffect} from 'react'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import PropTypes from "prop-types";
import {ContextMenuButtonContent} from "./ContextMenuButtonContent.jsx";


ContextMenuButton.propTypes = {
    content: PropTypes.element,
};

export function ContextMenuButton({content}) {

    const [isOpenedMenu, setIsOpenedMenu] = useState(false)
    const divMenu = useRef(null)

    const handleDisplayMenu = () => {
        setIsOpenedMenu(!isOpenedMenu)
    }

    const outsideClickListener = (event) => {
        const {current} = divMenu;
        if (current && !current.contains(event.target) ) {
            setIsOpenedMenu(false)
        }
    };


    useEffect(() => {

        document.addEventListener('click', outsideClickListener);
        return () => {
            document.removeEventListener('click', outsideClickListener);
        };
    }, []);

    return (
        <div ref={divMenu} className="relative">
            <button
                onClick={handleDisplayMenu}
                className="p-2 rounded-lg text-blue-500 text-md font-medium border-2 border-blue-500 hover:text-white
            hover:bg-blue-500 hover:border-transparent">
                <TuneOutlinedIcon size={24}/>
            </button>
            {isOpenedMenu ? (
                <div className="absolute rounded-lg top-12 left-0 p-3 border-2 border-gray-500 bg-gray-100">
                    <ContextMenuButtonContent>
                        {content}
                    </ContextMenuButtonContent>

                </div>
            ) : null}
        </div>
    )
}