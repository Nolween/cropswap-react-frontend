import PropTypes from "prop-types";
import {useMemo, useState} from "react";
import {BackOfficeRow} from "./BackOfficeRow.jsx";
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import {NorthOutlinedIcon} from "@mui/icons-material/NorthOutlined";
import React from "react";

BackOfficeTable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array,
    actions: PropTypes.array,
    perPage: PropTypes.number,
    onShow: PropTypes.func,
    onActionEmitted: PropTypes.func
}


export function BackOfficeTable({headers, rows, actions, perPage = null, onShow, onActionEmitted}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState({column: null, asc: true});

    const showLine = (rowIndex) =>  {
        onShow(((currentPage - 1) * perPage) + rowIndex);
    }

    const activate = (method, rowIndex)  => {
        onActionEmitted({method, rowIndex});
    };

    const sort = (column) => {
        if (sorting.column === column) {
            setSorting({...sorting, asc: !sorting.asc});
        } else {
            sorting.column = column;
            setSorting({...sorting, asc: true});
        }
    };

    const handleSetPage = (page) => () => {
        setCurrentPage(page);
    }


    const computedSortedRows = useMemo(() => {
        if (sorting.column) {
            let sortedRows = rows.sort((a, b) => {
                if (sorting.asc) {
                    if (a[sorting.column].type === 'number') {
                        return parseInt(a[sorting.column]) > parseInt(b[sorting.column]) ? 1 : -1;
                    } else {
                        return a[sorting.column] > b[sorting.column] ? 1 : -1;
                    }
                } else {
                    if (a[sorting.column].type === 'number') {
                        return parseInt(a[sorting.column]) < parseInt(b[sorting.column]) ? 1 : -1;
                    } else {
                        return a[sorting.column] < b[sorting.column] ? 1 : -1;
                    }
                }
            });
            // Pages
            if (perPage) {
                return sortedRows.slice((currentPage - 1) * perPage, currentPage * perPage);
            }
            return sortedRows;
        }

        if (perPage) {
            return rows.slice((currentPage - 1) * perPage, currentPage * perPage);
        }

        return rows;
    }, [rows, sorting, currentPage]);

    return (
        <div>
            <table className="w-full text-center">
                <thead>
                <tr className="border-b-2 border-gray-500">
                    {headers.map((header, headerIndex) => (
                        <React.Fragment key={headerIndex}>
                            {!header.hidden ? (
                                <th
                                    onClick={() => sort(header.column)}
                                    className="p-2 cursor-pointer back-office-header"
                                >
                                    <div
                                        className={`flex flex-nowrap justify-center ${sorting.column === header.column ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                                        <div>{header.name}</div>
                                        {sorting.column === header.column && sorting.asc ? (
                                            <NorthOutlinedIcon size={24}/>
                                        ) ? sorting.column === header.column && !sorting.asc ? (
                                            <SouthOutlinedIcon size={24}/>) : null : null : null}

                                    </div>
                                </th>
                            ) : null}
                        </React.Fragment>
                    ))}
                    {actions.length > 0 ? (
                        <th className="p-2">ACTIONS</th>
                    ) : null}
                </tr>
                </thead>
                <tbody>
                {computedSortedRows.map((row, rowIndex) => (
                    <BackOfficeRow
                        key={rowIndex}
                        columns={headers}
                        values={row} actions={actions}
                        onActionEmitted={(event) => activate(event, rowIndex)}
                        onShow={() => showLine(rowIndex)}/>
                ))}
                </tbody>
            </table>
            {perPage && rows.length > perPage ? (
                <div>
                    <div className="flex flex-wrap justify-center space-x-2 p- ">
                        <div className="cursor-pointer text-blue-400 font-bold"
                             onClick="currentPage > 1 ? currentPage = currentPage - 1 : ''">
                            Précédent
                        </div>
                        {Math.ceil(rows.length / perPage).map((page, pageIndex) => (
                            <React.Fragment key={page}>
                                {page === 1 || page === currentPage || page < currentPage + 3 && page > currentPage - 3 || page === Math.ceil(rows.length / perPage) || page % 10 === 0 ? (
                                    <div
                                        onClick={handleSetPage(page)}
                                        className={` cursor-pointer ${currentPage === page ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                                        {page}
                                    </div>
                                ) : null}
                            </React.Fragment>
                        ))}
                        <div className="cursor-pointer text-blue-400 font-bold"
                             onClick={() => currentPage < Math.ceil(rows.length / perPage) ? handleSetPage(currentPage + 1) : ''}>
                            Suivant
                        < /div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}