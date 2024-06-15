import * as Icons from '@mui/icons-material';
import PropTypes from 'prop-types';


SimpleCard.propTypes = {
    iconComponent: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string
};

export function SimpleCard({
                               iconComponent = "Add",
                               description = "Description of the simple card",
                               title = "Simple Card"
                           }) {
    const IconComponent = Icons[iconComponent];

    return (
        <div className="p-5">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-center">
                    {IconComponent ? <IconComponent
                        sx={{fontSize: 60}}
                    /> : null}
                </div>
                <div className="text-center p-1 lg:p-5">
                    <h2 className="text-lg lg:text-2xl font-bold">{title}</h2>
                    <p className="text-sm lg:text-lg">{description}</p>
                </div>
            </div>
        </div>
    )
}