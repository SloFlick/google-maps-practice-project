import React, { useRef, useState } from "react";
import './MapInit.css'
import {useJsApiLoader, GoogleMap, DirectionsRenderer, Autocomplete, Marker, StreetViewService} from '@react-google-maps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faCar, faPersonBiking, faPersonWalking, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const center = { lat: 46.14, lng: 14.59 }

const MapInit = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY_HERE, 
        libraries: ['places'],
    })
console.log(process.env.REACT_APP_API_KEY)
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [direction, setDirection] = useState(null)
    const [travelMode, setTravelMode] = useState('DRIVING')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')


    const originRef = useRef()
    const destinationRef = useRef()


    async function calculateRoute() {
        try {

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const outputs = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: travelMode,
        // eslint-disable-next-line no-undef
        })
        setDirection(outputs)
        setDistance(outputs.routes[0].legs[0].distance.text)
        setDuration(outputs.routes[0].legs[0].duration.text)
        }
        catch(error) {
            alert('There was an error loading your route')
        } 
    }

    if (!isLoaded) {
        return <h1>Loading....</h1>
    } else{}

    const clearRoute = () => {
        setDirection(null)
        originRef.current.value =''
        destinationRef.current.value =''
        setDuration('')
        setDistance('')
    }

    return(
        <div className="container">
            <div className="left-side-container">
                <div className="header">
                    <h1>Location Route</h1>
                </div>
                <div className="route-buttons">
                    <button className='calculate-btn' onClick={calculateRoute}>Route Directions</button>
                    <button className='clear-btn' onClick={clearRoute}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
                <div className="inputs">
                    <div className="travel-mode">
                        <ul>
                            <li>
                                <button onClick={() => setTravelMode('DRIVING')}>
                                    <FontAwesomeIcon icon={faCar} />
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTravelMode('TRANSIT')}>
                                    <FontAwesomeIcon icon={faBusSimple} />
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTravelMode('BICYCLING')}>
                                    <FontAwesomeIcon icon={faPersonBiking} />
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTravelMode('WALKING')}>
                                    <FontAwesomeIcon icon={faPersonWalking} />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="start">
                        <label>Starting location</label>
                        <Autocomplete>
                            <input type="text" ref={originRef}></input>
                        </Autocomplete>
                    </div>
                    <div className="destination">
                        <label>Destination</label>
                        <Autocomplete>
                            <input type="text" ref={destinationRef}></input>
                        </Autocomplete>
                    </div>
                    <div className="route-info">
                        <h1>Travel time: {duration}</h1>
                        <h1>Travel distance: {distance}</h1>
                    </div>
                </div>
            </div>
            <div position='absoulute' left={0} top={0} h='100%' w='100%'>
                <GoogleMap key={1} mapContainerClassName="map" center={center} zoom={15}
                onLoad={map => setMap(map)} options={{streetViewControl: false,}}>
                <Marker position={center} />
                {direction && (
                    <DirectionsRenderer directions={direction} />
                )}
                </GoogleMap>
            </div>
        </div>
    )
}

export default MapInit;