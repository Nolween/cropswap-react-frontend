import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {useTextTools} from "../../hooks/useTextTools.jsx";
import {useEffect, useMemo, useState} from "react";
import {Skeleton} from "../../components/Loader/Skeleton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useLoading} from "../../hooks/useLoading.jsx";
import {SecondaryArticle} from "../../components/Article/SecondaryArticle.jsx";
import {ArticleCard} from "../../components/Article/ArticleCard.jsx";

export function BlogIndex() {

    const {truncateText} = useTextTools();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [articlesCount, setArticlesCount] = useState(0);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


// Déclaration des éléments composables
    const {loading, setLoading} = useLoading();


    const computedSecondaryArticles = useMemo(() => {
        // Only keep 2nd to 4th articles
        return articles.slice(1, 4);
    }, [articles]);


    const computedArticles = useMemo(() => {
        if (search === '') {
            return articles;
        } else {

            return articles.filter(article => {
                // Filter articles by search
                return article.title.toLowerCase().includes(search.toLowerCase());

            })
        }
    }, [articles, search]);

    const navigate = useNavigate();

    const goToArticle = (id) => {
        // navigate(`/blog/article/${id}`);
    };


    // Fetch blog article data to /blog route
    const {tag} = useParams();

    const fetchBlogArticles = async () => {

        const url = !tag ? '/blog/index' : `/blog/index/${tag}`;
        setLoading(true);
        fetch(url).then(response => {
            setArticles(response.data);
            articles.map(article => {
                article.image = article.image.startsWith('http') ? article.image : `/images/blog/${article.image}`;
                // Remove html tags from content
                article.content = article.content.replace(/<[^>]*>?/gm, '');
                return article;
            });
            setLoading(false);
        }).catch(error => {
            console.error(error);
        });

    };

    useEffect(() => {
        // fetchBlogArticles();

        //  Set articles until fetching to back
        const fetchedArticles = [
            {
                id: 1,
                title: 'Article 1',
                content: 'Description 1',
                tags: ['tag1', 'tag2'],
                image: '/images/blog/1713554333.jpg'
            },
            {
                id: 2,
                title: 'Article 2',
                content: 'Description 2',
                tags: ['tag1', 'tag3'],
                image: '/images/blog/1713554446.jpg'
            },
            {
                id: 3,
                title: 'Article 3',
                content: 'Description 3',
                tags: ['tag2', 'tag3'],
                image: '/images/blog/1713562457.jpg'
            },
            {
                id: 4,
                title: 'Article 4',
                content: 'Description 4',
                tags: ['tag1', 'tag3'],
                image: '/images/blog/1713563132.jpg'
            },
            {
                id: 5,
                title: 'Article 5',
                content: 'Description 5',
                tags: ['tag1', 'tag2'],
                image: '/images/blog/1713563522.jpg'
            },

        ];
        setArticles(fetchedArticles)

        setArticlesCount(fetchedArticles.length);

    }, []);

    return (
        <div>
            <NavigationMenu></NavigationMenu>
            <div className="bg-orange-500 w-full">
                <h1 className="text-9xl text-center text-white font-extrabold font-title py-8">LE BLOG</h1>
            </div>
            <div className="flex flex-wrap w-full bg-orange-500">
                <div className="w-full">
                </div>
                <div
                    className="my-auto w-full lg:w-1/2 p-3 lg:p-6 space-y-4 cursor-pointer"
                    onClick={goToArticle(articles[0]?.id)}>
                    {articlesCount > 0 && !isLoading ? (
                        <div>
                            <img
                                src={articles[0].image}
                                alt="image" className="w-full"/>
                            <div className="text-white">
                                <h2 className="text-3xl font-bold text-justify">{articles[0].title}</h2>
                                <p className="text-xl text-justify">{
                                    truncateText(articles[0].content, 500)
                                }</p>
                            </div>
                        </div>) : isLoading ? (
                        <Skeleton disposition="vertical"
                                  max-rows={8}>
                        </Skeleton>
                    ) : null}
                </div>

                {articles.length > 1 ? (
                    <div className="w-full lg:w-1/2 flex flex-wrap p-3 lg:p-6 space-y-2">
                        {computedSecondaryArticles.map((secondaryArticle, secondaryArticleIndex) => (
                            <SecondaryArticle
                                key={secondaryArticleIndex}
                                title={secondaryArticle.title}
                                content={truncateText(secondaryArticle.content, 200)}
                                image={secondaryArticle.image}
                                id={secondaryArticle.id}
                                isLoading={isLoading}
                                onGoToArticle={goToArticle(secondaryArticle.id)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>

            <div>
                <div className=" w-full flex flex-wrap p-6">
                    <div className="w-1/2 text-2xl pl-2">Autres Articles</div>
                    <div className="w-1/2">
                        <input type="text"
                               value={search}
                               onChange={(event) => setSearch(event.target.value)}
                               placeholder="Rechercher un article"
                               className="w-full p-2"/>
                    </div>
                </div>

                {
                    computedArticles.length > 3 ? (
                            <div className="w-full p-3 lg:p-6 space-y-4 mb-40">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {computedArticles.map((article, articleIndex) => (
                                        articleIndex > 3 && (
                                            <ArticleCard
                                                key={articleIndex}
                                                title={article.title}
                                                content={truncateText(article.content, 300)}
                                                image={article.image}
                                                id={article.id}
                                                onGoToArticle={goToArticle}
                                                isLoading={isLoading}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        ) :
                        null}
            </div>

        </div>
    )
}