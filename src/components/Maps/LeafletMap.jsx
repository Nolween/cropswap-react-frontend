import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export function LeafletMap({
                               zoomLevel = 6,
                               center = [46.605, 1.09],
                               markers = []
                           }) {
    // Map Declaration
    let map;

    const navigate = useNavigate();
    // Functions
    const goToCrop = (id) => {
        // navigate(`/crop/${id}`);
    };

    const renderMap = (zoomLevel, center, markers) => {

        if (!document.getElementById('mapid')) {
            // If the element does not exist, return early to avoid creating the map.
            return;
        }

        let zoomLevel2 = zoomLevel;
        let center2 = center;

        // Destroy map container
        if (map) {
            //  keep the zoom level and center
            center2 = map.getCenter();
            zoomLevel2 = map.getZoom();
            map.remove();
        }


        map = L.map('mapid', {scrollWheelZoom: false}).setView(center2, zoomLevel2);

        let LeafIcon = L.Icon.extend({
            options: {
                // shadowUrl: 'leaf-shadow.png',
                iconSize: [38, 95],
                shadowSize: [50, 64],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        });

        // Foreach markers to add them to the map
        markers.forEach(marker => {
            let oneIcon
            switch (marker.icon) {
                case 'leaf-green':
                    oneIcon = new LeafIcon({iconUrl: '/images/icons/leaf-green.png'});
                    break;
                case 'leaf-orange':
                    oneIcon = new LeafIcon({iconUrl: '/images/icons/leaf-orange.png'});
                    break;
                case 'leaf-red':
                    oneIcon = new LeafIcon({iconUrl: '/images/icons/leaf-red.png'});
                    break;
                default:
                    oneIcon = new LeafIcon({iconUrl: '/images/icons/leaf-green.png'});
            }
            let mark = L.marker(marker.position, {icon: oneIcon}).addTo(map);
            // Add Name of crop and its description
            mark.bindPopup(`<b>${marker.name}</b>
        <br>${marker.description}
        <br><p id="crop-${marker.id}" className="cursor-pointer""><b>Voir le crop</b></p>`);


            mark.on('popupopen', () => {
                let cropElement = document.getElementById(`crop-${marker.id}`);
                cropElement.addEventListener('click', () => goToCrop(marker.id));
            });
        });


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);


        // Listen for 'keyup' event on the document.
        document.addEventListener('keydown', function (event) {
            if (event.key === "Control") {
                // If the 'Control' key is released, disable scroll wheel zoom.
                map.scrollWheelZoom.enable();
            }
        });
        // Listen for 'keyup' event on the document.
        document.addEventListener('keyup', function (event) {
            if (event.key === "Control") {
                // If the 'Control' key is released, disable scroll wheel zoom.
                map.scrollWheelZoom.disable();
            }
        });
    };


    useEffect(() => {
        renderMap(zoomLevel, center, markers);
    }, []);

    return (
        <div id="mapid" className="w-full h-full z-30"></div>
    )
}

