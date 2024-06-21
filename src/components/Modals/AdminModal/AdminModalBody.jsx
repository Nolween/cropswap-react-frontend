import propTypes from 'prop-types';

AdminModalBody.propTypes = {
    children: propTypes.element
}

export function AdminModalBody({children}) {
    return (
        <div>
            {children}
        </div>
    )
}