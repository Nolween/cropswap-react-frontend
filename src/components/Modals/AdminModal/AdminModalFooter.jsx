import propTypes from 'prop-types';

AdminModalFooter.propTypes = {
    children: propTypes.element
}

export function AdminModalFooter({children}) {
    return (
        <div>
            {children}
        </div>
    )
}