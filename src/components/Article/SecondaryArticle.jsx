import PropTypes from "prop-types";
import {Skeleton} from "../Loader/Skeleton.jsx";

SecondaryArticle.propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    isLoading: PropTypes.bool,
    goToArticle: PropTypes.func
};


export function SecondaryArticle({id, image, title, content, isLoading, goToArticle}) {

    const handleGoToArticle = (id) => () => {
        goToArticle(id)
    }

    return (
        <div>
            {!isLoading ? (
                <div>
                    <div className="min-h-52 space-x-2 flex cursor-pointer items-center"
                         onClick={handleGoToArticle(id)}>
                        <img src={image}
                             alt="image" className="w-1/2 object-cover"/>
                        <div className="text-white w-1/2 p-2">
                            <h2 className="text-3xl font-bold text-justify">{title}</h2>
                            <p className="text-md text-justify">{
                                content
                            }</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="w-full">
                        <Skeleton></Skeleton>
                    </div>
                </div>
            )}

        </div>
    )
}