import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";

// PROPS TYPES
LeafletMap.propTypes = {
    zoomLevel: PropTypes.number,
    center: PropTypes.array,
    markers: PropTypes.array
}

export function LeafletMap({
                               zoomLevel = 6,
                               center = [46.605, 1.09],
                               markers = []
                           }) {
    // Map Declaration
    let mapRef = useRef(null);

    // Functions
    const goToCrop = (id) => {
        console.log(id)
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
        if (mapRef.current) {
            //  keep the zoom level and center
            center2 = mapRef.current.getCenter();
            zoomLevel2 = mapRef.current.getZoom();
            mapRef.current.remove();
        }

        mapRef.current = L.map('mapid', {scrollWheelZoom: false}).setView(center2, zoomLevel2);

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
            let mark = L.marker(marker.position, {icon: oneIcon}).addTo(mapRef.current);
            // Add Name of crop and its description
            mark.bindPopup(`<b>${marker.name}</b>
        <br>${marker.description}
        <br><p id="crop-${marker.id}" class="cursor-pointer""><b>Voir le crop</b></p>`);


            mark.on('popupopen', () => {
                let cropElement = document.getElementById(`crop-${marker.id}`);
                cropElement.addEventListener('click', () => goToCrop(marker.id));
            });
        });


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current);


        // Listen for 'keyup' event on the document.
        document.addEventListener('keydown', function (event) {
            if (event.key === "Control") {
                // If the 'Control' key is released, disable scroll wheel zoom.
                mapRef.current.scrollWheelZoom.enable();
            }
        });
        // Listen for 'keyup' event on the document.
        document.addEventListener('keyup', function (event) {
            if (event.key === "Control") {
                // If the 'Control' key is released, disable scroll wheel zoom.
                mapRef.current.scrollWheelZoom.disable();
            }
        });
    };


    useEffect(() => {
        renderMap(zoomLevel, center, markers);
    }, [zoomLevel, center, markers]);

    return (
        <div id="mapid" className="w-full h-full z-30"></div>
    )
}

