import PropTypes from "prop-types";
import dayjs from "dayjs";
import * as Icons from '@mui/icons-material';
import React from "react";

BackOfficeRow.propTypes = {
    values: PropTypes.object,
    actions: PropTypes.array,
    columns: PropTypes.array,
    onShow: PropTypes.func,
    onActionEmitted: PropTypes.func
}

export function BackOfficeRow({values = [], actions, columns, onShow, onActionEmitted}) {

    const iconComponents = actions.map((action) => {
        const IconComponent = Icons[action.icon];
        if (!IconComponent) {
            console.error(`Icon "${action.icon}" is not found in @mui/icons-material package.`);
            return null;
        }
        return {
            icon: IconComponent,
            title: action.title,
            color: action.color,
            method: action.method
        }
    }).filter(Boolean); // filter out any null values

    // Function to find the value type according to props columns
    const column = (index) => {
        // Find in props columns the type of the value
        return columns.find((column) => column.column === index);
    };


    const emitAction = (event, method) => {
        // Stop the event propagation
        event.stopPropagation();
        onActionEmitted(method);
    };

    return (
        <tr onClick={onShow} className="back-office-row border-b-2 border-gray-200 cursor-pointer hover:bg-lime-50">
            {Object.keys(values).map((value, valueIndex) => (
                <React.Fragment key={valueIndex}>
                    {(() => {
                        const columnData = column(value);
                        if (columnData.type === 'image' && !columnData.hidden) {
                            return (
                                <td className="p-2 flex justify-center items-center">
                                    <img alt="" src={values[value]} className="object-cover h-11 w-11"/>
                                </td>
                            );
                        } else if (columnData.type === 'date' && !columnData.hidden) {
                            return (
                                <td className="p-2 text-center">
                                    {dayjs(values[value]).format('DD/MM/YYYY HH:mm:ss')}
                                </td>
                            );
                        } else if (columnData.type === 'stringArray') {
                            return (
                                <td className="flex flex-wrap gap-2 justify-center items-center">
                                    {columnData.map((arrayValue, arrayValueIndex) => (
                                        <div key={arrayValueIndex}>
                                            <span className="bg-blue-500 text-white p-2 rounded-md">{arrayValue}</span>
                                        </div>
                                    ))}
                                </td>
                            );
                        } else if (!columnData.hidden) {
                            return (
                                <td className="p-2 text-center">{values[value]}</td>
                            );
                        } else {
                            return null;
                        }
                    })()}
                </React.Fragment>
            ))}
            <td className="p-2 flex flex-wrap gap-2 justify-center">
                {iconComponents.map((action, actionIndex) => (
                        <button key={actionIndex}
                                className={`action-row-button cursor-pointer p-2 bg-white rounded-lg text-md font-medium border-2 hover:text-white hover:border-transparent border-${action.color}-500 hover:bg-${action.color}-500 text-${action.color}-500 action-${action.method}`}
                                onClick={(event) => emitAction(event, action.method)}>
                            <action.icon
                                sx={{fontSize: 24}}
                            />
                        </button>
                    )
                )}
            </td>
        </tr>

    )
}