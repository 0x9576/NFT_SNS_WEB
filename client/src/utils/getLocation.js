import Geocode from "react-geocode";
import { GoogleMapAPI_Key } from "./API_Key";

export function getLocation() {
    if (navigator.geolocation) {
        // GPS를 지원하면
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // console.info(
                    //     `re:${position.coords.latitude} ${position.coords.longitude}`,
                    // );
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                function (error) {
                    //console.error(error);
                    resolve({
                        latitude: 37.3595704,
                        longitude: 127.105399,
                    });
                },
                {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity,
                },
            );
        }).then(coords => {
            //console.log(`coords:${JSON.stringify(coords)}`);
            return coords;
        });
    }
    console.info('GPS를 지원하지 않습니다');
    return {
        latitude: 37.3595704,
        longitude: 127.105399,
    };
}

export function getLocationInfo(latitude, longitude) {
    Geocode.setApiKey(GoogleMapAPI_Key);
    Geocode.setLanguage("kr");
    Geocode.setRegion("kr");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug(true);

    return new Promise(resolve => {
        Geocode.fromLatLng(String(latitude), String(longitude)).then(
            (response) => {
                const address = response.results[0].formatted_address;
                resolve(address);
            },
            (error) => {
                console.error(error);
                resolve(error);
            }
        );
    })
}