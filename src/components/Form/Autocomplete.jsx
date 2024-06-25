import {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from "prop-types";

Autocomplete.propTypes = {
    placeholder: PropTypes.string,
    values: PropTypes.array,
    selectedValues: PropTypes.array,
    isMultiple: PropTypes.bool,
    onUpdateSelectedValues: PropTypes.func,
}

export function Autocomplete({placeholder = '',  values, selectedValues, onUpdateSelectedValues, isMultiple = false}) {

    const [isOpenedList, setIsOpenedList] = useState(false)
    const [search, setSearch] = useState('')

    const searchValues = (e) => {
        setSearch(e.target.value);
    }

    const clearSearch = () => {
        setSearch('');
    }

    const filteredValues = useMemo(() => {
        return values.filter(value => value.name.toLowerCase().includes(search.toLowerCase()));
    }, [values, search]);

    const autocomplete = useRef(null);
    const autocompleteList = useRef(null);

    const outsideClickListener = (event) => {
        const {current} = autocomplete;
        if (current && !current.contains(event.target) ) {
            setIsOpenedList(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', outsideClickListener);
        return () => {
            document.removeEventListener('click', outsideClickListener);
        };
    }, []);

    const handleUpdateSelectedValues = (values) => {
        onUpdateSelectedValues(values);
    }

    const handleSelectValue = (value) => {
        setIsOpenedList(false)
        handleUpdateSelectedValues(value);
    }

    const handleSetOpenedList = (value) => () => {
        setIsOpenedList(value)
    }

    return (
        <div className="relative z-30" id="autocomplete" ref={autocomplete}>
            <input type="text"
                   className="autocomplete-input w-full p-2 border-2 border-gray-200 rounded-lg"
                   placeholder={placeholder}
                   value={search} onInput={searchValues} onClick={handleSetOpenedList(true)}/>
            {search.length > 0 ? (
                <div className="autocomplete-cross absolute right-3 top-3 cursor-pointer"
                     onClick={clearSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="h-5 w-5 text-gray-500">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
            ) : null}
            {isOpenedList ? (
                <div ref={autocompleteList}
                    className="autocomplete-list max-h-40 overflow-auto z-60 absolute t-6 w-full bg-white border-2 border-gray-200 rounded-lg">
                    {filteredValues.map(value => (
                        <div
                            key={value.id}
                            className={`autocomplete-value p-2 cursor-pointer hover:bg-gray-100 ${selectedValues.includes(value) ? 'bg-blue-100' : ''}`}
                            onClick={() => handleSelectValue(value)}>
                            {value.name}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}