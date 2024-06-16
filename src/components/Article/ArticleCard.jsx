import PropTypes from "prop-types";
import {Skeleton} from "../Loader/Skeleton.jsx";

ArticleCard.propTypes = {
    isLoading: PropTypes.bool,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    goToArticle: PropTypes.func,
    id: PropTypes.number
};

export function ArticleCard({isLoading, image, title, content, goToArticle, id}) {

    const handleGoToArticle = (id) => () => {
        goToArticle(id)
    }

    return (
        <div>
            {!isLoading ? (
                <div>
                    <div className="space-y-2 p-2 cursor-pointer"
                         onClick={handleGoToArticle(id)}>
                        <img
                            src={image}
                            alt="image" className="w-full object-cover max-h-40"/>
                        <div className="text-black">
                            <h2 className="text-3xl font-bold text-justify">{title}</h2>
                            <p className="text-xl text-justify">{content}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="w-full">
                        <Skeleton disposition="vertical"
                                  maxRows={8}>
                        </Skeleton>
                    </div>
                </div>
            )}
        </div>
    )
}