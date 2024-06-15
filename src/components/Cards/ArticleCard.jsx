import dayjs from "dayjs";
import PropTypes from "prop-types";
import {useTextTools} from "../../hooks/useTextTools";
import "./ArticleCard.css";

ArticleCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    user: PropTypes.object,
    id: PropTypes.number,
    contentLength: PropTypes.number,
    created_at: PropTypes.string,
    onGoToArticle: PropTypes.func,
    onGoToTag: PropTypes.func
};

export function ArticleCard({
                                title = 'Title',
                                content = 'Content',
                                image = 'image.jpg',
                                tags = [],
                                user = {},
                                id = 0,
                                contentLength = 30,
                                created_at = '2024-01-01',
                                onGoToArticle,
                                onGoToTag
                            }) {

    const {truncateText} = useTextTools();


    const goToTag = (event, tag) => {
        event.stopPropagation();
        onGoToTag(tag);
    }

    const goToArticle = () => {
        onGoToArticle(id);
    }

    return (
        <div className="min-w-[320px] bg-white shadow-lg p-3 cursor-pointer article-card"
             onClick={goToArticle}
        >
            <img src={image} alt="image" className="w-full object-cover mb-4"/>
            <div className="flex flex-wrap gap-1 mb-4">
                {tags.map((tag, tagIndex) => (
                    <span onClick={(event) => goToTag(event, tag)} key={tagIndex}
                          className="card-tag border-2 border-transparent hover:border-blue-500 hover:text-blue-500 hover:bg-white py-0.5 px-1 rounded-md text-xs bg-blue-500 text-white font-bold">
                {tag}
            </span>
                ))}
            </div>
            <div className="text-black font-bold flex flex-wrap mb-3 text-lg ">{title}</div>
            <div className="article-card-content font-light text-sm text-justify mb-3"> {
                truncateText(content, contentLength)}</div>

            <div className="w-full flex flex-grow items-center">
                <img src={user?.image} className="w-10 h-10 object-cover rounded-md mr-3" alt=""/>
                <div className="items-center">
                    <span className="text-xs font-medium">{user?.name}</span>
                    <div className="flex flex-wrap">
                                <span className="text-xs font-medium">{
                                    dayjs(created_at).format('DD/MM/YYYY')
                                }</span>
                    </div>
                </div>
            </div>
        </div>
    )

}