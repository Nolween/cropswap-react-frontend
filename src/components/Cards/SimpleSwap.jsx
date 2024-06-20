import PropTypes from "prop-types";
import {useState, useRef, useEffect} from "react";

SimpleSwap.propTypes = {
    swap: PropTypes.object,
    actions: PropTypes.array,
    onActionEmitted: PropTypes.func
};

export function SimpleSwap({swap, actions, onActionEmitted}) {

    const [openedContext, setOpenedContext] = useState(false);

    const [contextMenuX, setContextMenuX] = useState(0);
    const [contextMenuY, setContextMenuY] = useState(0);
    const swapCard = useRef(null);


    const openContext = (event) => {
        if (actions && swapCard.current === event.target) {
            const rect = swapCard.value.getBoundingClientRect();
            setContextMenuX(event.pageX - rect.left);
            setContextMenuY(event.pageY - rect.top);
            setOpenedContext(true);
        }
    }


    const emitAction = (actionIndex) => () => {
        onActionEmitted(actionIndex);
    }

    useEffect(() => {
        document.addEventListener('click', outsideClickListener);
        return () => {
            document.removeEventListener('click', outsideClickListener);
        };
    }, []);


    const outsideClickListener = (event) => {
        const {current} = swapCard;
        if (current && !current.contains(event.target) ) {
            setOpenedContext(false)
        }
    };

    return (
        <div
            className="relative w-20 min-h-24 md:w-32 md:min-h-40 xl:w-60 xl:min-h-60 p-1 md:p-4 justify-center border-b-gray-200 border-2 rounded-lg bg-white hover:bg-lime-50 cursor-pointer"
            onClick={openContext} ref={swapCard}>
            <div className="text-xs md:text-md xl:text-xl font-bold text-center">{swap.name}</div>
            <img src={`/images/food/${swap.image}`}
                 alt={swap.name}
                 className="w-16 min-h-16 md:w-28 md:min-h-28 xl:w-40 xl:min-h-40  md:p-4 mx-auto"/>
            {openedContext ? (
                <div
                    className="z-40 w-40 lg:w-80 absolute border-2 border-gray-300 bg-white rounded-md lg:p-2 text-gray-800"
                    style={{top: `${contextMenuY}px`, left: `${contextMenuX}px`}}>
                    {actions.map((action, actionIndex) => (
                        <div key={actionIndex}>
                            <button onClick={emitAction(actionIndex)}
                                    className="action-swap lg:p-2 align-middle w-full rounded-md text-gray-800 hover:bg-gray-200 hover:text-gray-900 text-sm">
                                {action}
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}