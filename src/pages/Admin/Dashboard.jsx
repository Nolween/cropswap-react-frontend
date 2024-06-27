import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {AdminSideBar} from "../../layouts/AdminSideBar.jsx";
import {SimpleCard} from "../../components/Cards/SimpleCard.jsx";
import {useEffect, useState} from "react";

export function Dashboard() {

    const [cropsCount, setCropsCount] = useState(0);
    const [swapsCount, setSwapsCount] = useState(0);
    const [messagesCount, setMessagesCount] = useState(0);
    const [articlesCount, setArticlesCount] = useState(0);

    useEffect(() => {
        setCropsCount(4);
        setSwapsCount(3);
        setMessagesCount(5);
        setArticlesCount(6);
    },[]);

    return (
        <div className="md:h-screen md:overflow-hidden">
            <NavigationMenu/>
            <div className="h-full flex flex-wrap">
                <AdminSideBar></AdminSideBar>
                <div className="w-full md:w-2/3 bg-gray-50">
                    <div className="w-full text-xl md:text-5xl font-mono text-orange-500 border-b-2 p-3">
                        DASHBOARD
                    </div>
                    <div className="pt-4 text-2xl md:text-5xl font-bold text-center text-orange-500">
                        STATISTIQUES
                    </div>
                    <div className="flex flex-wrap justify-around w-full">
                        <SimpleCard title={cropsCount.toString()} description="Crops inscrits" iconComponent="GrassOutlined"/>
                        <SimpleCard title={swapsCount.toString()} description="Swap référencés" iconComponent="LocalFloristOutlined"/>
                        <SimpleCard title={messagesCount.toString()} description="Messages envoyés" iconComponent="MessageOutlined"/>
                        <SimpleCard title={articlesCount.toString()} description="Articles publiés" iconComponent="NewspaperOutlined"/>
                    </div>
                </div>
            </div>
        </div>
    )
}