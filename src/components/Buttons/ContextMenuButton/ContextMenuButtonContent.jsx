import propTypes from 'prop-types';

ContextMenuButtonContent.propTypes = {
    children: propTypes.element
}

export function ContextMenuButtonContent({children}) {
    return (
        <div>
            {children}
        </div>
    )
}