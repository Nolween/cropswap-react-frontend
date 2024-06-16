import {PropTypes} from 'prop-types';
import {useMemo} from "react";

Skeleton.propTypes = {
    disposition: PropTypes.string,
    hasImage: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
};


export function Skeleton({
                             disposition = 'horizontal',
                             hasImage = true,
                             minRows = 2,
                             maxRows = 4
                         }) {


    const rows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;

    const generateClass = () => {
        const randomWidth = Math.floor(Math.random() * 4) + 1;
        return {
            'mb-2': Math.random() >= 0.5,
            [`w-${randomWidth}/4`]: true
        };
    }


    const rowClasses = useMemo(() => Array.from({length: rows}, generateClass), [rows]);


    return (
        <div>
            {disposition === 'horizontal' ? (
                <div className="min-h-52 space-x-2 flex cursor-pointer items-center">
                    {hasImage ? (
                        <div className="w-1/2 object-cover">
                            <div className="animate-image animate-pulse bg-gray-300 h-52 w-full"></div>
                        </div>
                    ) : null}
                    <div className="text-white w-1/2 p-2">
                        {Array.from({ length: rows }, (_, index) => (
                            <div key={index}
                                 className={`animate-row animate-pulse bg-gray-300 h-8 ${rowClasses[index]}`}>
                            </div>
                        ))}
                    </div>
                </div>) : (
                <div className="min-h-52 gap-2 flex flex-wrap cursor-pointer items-center">
                    {hasImage ? (
                        <div className="p-2 w-full object-cover">
                            <div className="animate-image animate-pulse bg-gray-300 h-52 w-full"></div>
                        </div>
                    ) : null}
                    <div className="text-white w-full p-2">
                        {Array.from({ length: rows }, (_, index) => (
                            <div key={index}
                                 className={`animate-row animate-pulse bg-gray-300 h-8 ${rowClasses[index]}`}>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}