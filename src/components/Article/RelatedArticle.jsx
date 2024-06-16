import PropTypes from "prop-types";

RelatedArticle.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    goToArticle: PropTypes.func
}


export function RelatedArticle({id, title, author, date, image, goToArticle}) {

    const handleGoToArticle = (id) => () => {
        goToArticle(id)
    }

    return (
        <div className="flex flex-wrap justify-between items-center w-1/2 lg:w-1/3 xl:w-full cursor-pointer text-white"
             onClick={handleGoToArticle(id)}>
            <div className="w-1/2">
                <img className="w-full h-32 object-cover rounded-md"
                     src={image}
                     alt="image"/>
            </div>
            <div className="w-1/2 p-2">
                <div className="text-md font-bold mb-2">{title}</div>
                <div className="text-xs flex flex-nowrap space-x-2">
                    <img className="w-6 h-6 rounded-3xl"
                         src="https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                         alt="facebook"/>
                    <div>
                        <div className="font-bold">{author}</div>
                        <div className="font-medium">{date}</div>
                    </div>

                </div>
            </div>
        </div>
    )
}