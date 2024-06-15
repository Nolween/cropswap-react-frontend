import {NavigationMenu} from "../layouts/NavigationMenu.jsx";
import {SimpleCard} from "../components/Cards/SimpleCard.jsx";
import {LeafletMap} from "../components/Maps/LeafletMap.jsx";
import {ArticleCard} from "../components/Cards/ArticleCard.jsx";
import {Link} from "react-router-dom";

export function Home() {

    const markers = [
        {
            position: [46.605, 1.09],
            icon: 'leaf-green',
            id: 1,
            description: 'Marker Description 1',
            name: 'Crop 1'
        },
        {
            position: [44.83, 2.85],
            icon: 'leaf-green',
            id: 2,
            description: 'Marker Description 2',
            name: 'Crop 2'
        },
    ]

    const articles = [
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
        }
    ];


    const isAuthenticated = false;

    const handleGoToArticle = (id) => {
        // handle the event here, e.g., navigate to the article page
        console.log(`Go to article with id: ${id}`);
    }

    const handleGoToTag = (tag) => {
        // handle the event here, e.g., filter articles by tag
        console.log(`Go to tag: ${tag}`);
    }

    return (
        <div>
            <NavigationMenu isAuthenticated={false}/>

            <div className="flex flex-wrap bg-lime-500 p-5 justify-around items-center">
                <div className="sm:w-full md:w-1/2 space-y-6">
                    <p className="text-6xl lg:text-8xl font-extrabold text-black text-center p-3">
                        Des choses à partager?
                    </p>
                    {/* TITLE */}
                    {!isAuthenticated ? (
                            <div className="text-center">
                                <Link to="/register"
                                      className="text-xl bg-orange-500 text-white p-3 rounded-xl hover:bg-white hover:text-orange-500 font-bold">
                                    INSCRIPTION
                                </Link>
                            </div>
                        )
                        : null}
                </div>
                <div className="py-8 sm:w-full md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1647275621308-f715bee42fe7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="image" className="rounded-lg "/>
                </div>

            </div>
            {/* CARDS */}

            <div>
                <div className="flex flex-wrap justify-center items-center px-5 lg:px-8">
                    <SimpleCard title="Partagez"
                                description="Partagez vos produits avec la communauté"
                                iconComponent="Icecream"
                                className="w-1/2 xl:w-1/4"/>
                    <SimpleCard title="Partagez"
                                description="Partagez vos produits avec la communauté"
                                iconComponent="Icecream"
                                className="w-1/2 xl:w-1/4"/>
                    <SimpleCard title="Partagez"
                                description="Partagez vos produits avec la communauté"
                                iconComponent="Icecream"
                                className="w-1/2 xl:w-1/4"/>
                    <SimpleCard title="Partagez"
                                description="Partagez vos produits avec la communauté"
                                iconComponent="Icecream"
                                className="w-1/2 xl:w-1/4"/>
                </div>
            </div>

            <div className="flex justify-center h-[600px]">
                <LeafletMap markers={markers}/>
            </div>

            <div className="bg-orange-500 p-5">
                <div className="flex flex-wrap justify-around items-center">
                    <div className="sm:w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="image" className="rounded-lg "/>
                    </div>
                    <div className="sm:w-full md:w-1/2">
                        <div className="text-xl lg:text-2xl font-extrabold text-black text-center p-3">
                            Regardez près de chez vous les différents crops et swaps pour varier votre alimentation sans
                            rien payer.
                        </div>
                        <div className="text-xl lg:text-2xl font-extrabold text-black text-center p-3">
                            Rencontrez des personnes qui partagent les mêmes valeurs que vous et qui souhaitent partager
                            leurs produits.
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-gray-200 p-3 flex flex-nowrap overflow-x-auto gap-3">
                {articles.map((article, articleIndex) => (
                    <ArticleCard key={articleIndex} {...article} onGoToArticle={handleGoToArticle}
                                 onGoToTag={handleGoToTag}/>
                ))}
            </div>
        </div>

    )
}