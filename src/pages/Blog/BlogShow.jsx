import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RelatedArticle} from "../../components/Article/RelatedArticle.jsx";
import PropTypes from "prop-types";

BlogShow.propTypes = {
    id: PropTypes.number,
    comments: PropTypes.array,
    title: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    author: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string,
}

export function BlogShow({
                             id = 0,
                             title = 'Title',
                             image = '1713554333.jpg',
                             tags = [],
                             author = 'Author',
                             created_at = '2024-01-01',
                             content = 'Content Article',
                             comments = []
                         }) {

    const [comment, setComment] = useState();
    const [relatedArticles, setRelatedArticles] = useState([
        {
            title: 'Article 1',
            author: 'Author 1',
            date: '2024-01-01',
            image: '/images/blog/1713563522.jpg',
            id: 1,
        },
        {
            title: 'Article 2',
            author: 'Author 2',
            date: '2024-01-01',
            image: '/images/blog/1713650020.jpg',
            id: 2,
        },

    ]);


    // const navigate = useNavigate();

    const goToArticle = (id) => {
        // navigate(`/blog/article/${id}`);
    };


    const computedImage = useMemo(() => {
        // If image begins with http, it's an url
        if (image && image.startsWith('http')) {
            return image;
        } else if (image) {
            // If image is a file, add the public image blog path
            return `/images/blog/${image}`;
        }
        return '1713554333.jpg';
    }, [image]);

    const goToArticlesTag = (tag) => {
        // navigate(`/blog/${tag}`);
    };

    const sendComment = async () => {
        fetch(`/blog/article/comment`, {
            method: 'POST',
            content: comment.value,
            blog_article_id: id
        }).then(response => {
            if (response.data.success) {
                comments.unshift(response.data.comment);
                comment.value = '';
            }
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        // If article is not null, set the image to the computed image
        if (image) {
            image = computedImage;
        }
    }, []);

    return (

        <div>
            <NavigationMenu></NavigationMenu>
            <div className="flex flex-wrap justify-around items-center">
                <div className="w-full md:w-1/2 p-6 font-title text-gray-700 space-y-4">
                    <h2 className="text-4xl font-extrabold ">{title}</h2>

                    <div className="w-1/4 h-0.5 bg-gray-200"></div>

                    <div className="w-full flex flex-wrap gap-3">

                        {tags.map((tag, tagIndex) => (
                            <div className="flex"
                                 key={tagIndex}>
                                <span onClick={goToArticlesTag(tag)}
                                      className="hover:text-blue-500 hover:bg-white hover:border-blue-500 border-2 border-transparent bg-blue-500 text-white font-medium p-2 rounded-md cursor-pointer">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="font-bold">{author}</div>
                            <div className="font-medium">Le {dayjs(created_at).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="space-x-2">
                            <div className="text-sm font-medium">Partager l'article</div>
                            <div className="flex flex-wrap justify-around">
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/facebook-new.png"
                                     alt="facebook"/>
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/twitter.png"
                                     alt="twitter"/>
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/000000/linkedin.png"
                                     alt="linkedin"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
                    <img className="w-full h-full object-cover"
                         src={computedImage}
                         alt="image"/>
                </div>
            </div>
            <div className="w-full h-0.5 bg-gray-200"></div>


            <div className="flex flex-wrap">
                <div className="p-6 w-full xl:w-3/4 space-y-4 text-justify">
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                </div>

                <div className="w-full xl:w-1/4 p-5 bg-orange-500">
                    <div className="font-bold text-2xl mb-3">Articles similaire</div>

                    <div className="space-y-4 flex flex-wrap">
                        {relatedArticles.map((relatedArticle, relatedArticleIndex) => (
                            <RelatedArticle
                                key={relatedArticleIndex}
                                title={relatedArticle.title}
                                author={relatedArticle.author}
                                date={relatedArticle.date}
                                image={relatedArticle.image}
                                id={relatedArticle.id}
                                onGoToArticle={goToArticle(relatedArticle.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full p-6 space-y-4">
                    <div className="font-bold text-2xl">Commentaires</div>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                        <textarea value={comment} onChange={(event) => setComment(event.target.value)}
                                  className="w-full p-2 border-2 border-gray-200 rounded-md"
                                  placeholder="Votre commentaire"
                                  rows="5">
                        </textarea>
                        </div>
                        <div className="w-full">
                            <button
                                onClick={sendComment}
                                className="w-full p-2 rounded-lg text-md font-medium border-2 cursor-pointer text-white
                            bg-orange-500 hover:bg-orange-600">
                                Commenter
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap space-y-3">
                        {comments.map((comment, commentIndex) => (
                            <div key={commentIndex} className="w-full">
                                <div className="flex flex-wrap justify-between p-2 border-b-2 border-gray-200">
                                    <div className="flex flex-wrap">
                                        <img className="w-10 h-10 object-cover rounded-md mr-3"
                                             src={comment.avatar}
                                             alt="user image"/>
                                        <span className="text-quizzlab-quinary text-xl font-medium pt-1">
                                            {comment.user}</span>
                                    </div>
                                    <div className="flex flex-wrap pt-1">
                                        <svg-icon path="mdiTimerOutline" className="text-quizzlab-ternary w-7 h-7 mr-1"
                                                  type="mdi">
                                        </svg-icon>
                                        <span className="text-quizzlab-ternary text-xl font-medium">
                                            {dayjs(comment.created_at).fromNow()}</span>
                                    </div>
                                </div>
                                <div className="text-md text-quizzlab-primary font-medium p-2">
                                    {comment.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}