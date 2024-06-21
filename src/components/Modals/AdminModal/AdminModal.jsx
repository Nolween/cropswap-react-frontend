import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import {AdminModalFooter} from "./AdminModalFooter.jsx";
import {AdminModalBody} from "./AdminModalBody.jsx";

AdminModal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    body: PropTypes.element,
    footer: PropTypes.element
};


export function AdminModal({title, onClose, body, footer}) {

    const handleClose = () => {
        onClose();
    }

    return (
        <div
            className="flex modal-container h-full w-full z-50 top-0 left-0 fixed items-center justify-center bg-gray-700 bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-wrap rounded-lg w-full md:w-1/2 z-50 border-4 border-orange-500 p-3 bg-white">
                <div className="flex justify-between w-full mb-4">
                    <div className="text-black text-xl font-bold">
                        {title}
                    </div>
                    <div className="cursor-pointer">
                        <CloseIcon className="close-icon"
                                   onClick={handleClose} size="26">
                        </CloseIcon>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <AdminModalBody>
                        {body}
                    </AdminModalBody>
                </div>
                <div className="w-full">
                    <AdminModalFooter>
                        {footer}
                    </AdminModalFooter>
                </div>
            </div>
        </div>
    )
}