import PropTypes  from "prop-types";

BodyModal.propTypes = {
    children: PropTypes.element
}

export function BodyModal({children}) {
    return (
        <div className='bg-gray-400 rounded-2xl'>
            {children}
        </div>
    )
}