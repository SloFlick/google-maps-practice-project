import React, { useRef, useState } from "react";
import './MapInit.css'
import {useJsApiLoader, GoogleMap, DirectionsRenderer, Autocomplete, Marker} from '@react-google-maps/api'

const center = { lat: 46.14, lng: 14.59 }

const MapInit = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_KEY, 
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [direction, setDirection] = useState(null)

    const originRef = useRef()
    const destinationRef = useRef()

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const inputs = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.TRANSIT
        })
        setDirection(inputs)
    }

    if (!isLoaded) {
        return <h1>Loading....</h1>
    } else{}

    return(
        <div className="container">
            <div className="left-side-container">
                <div className="header">
                    <h1>Location Route</h1>
                </div>
                <div className="inputs">
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
                    <button onClick={calculateRoute}></button>
                </div>
            </div>
            <div position='absoulute' left={0} top={0} h='100%' w='100%'>
                <GoogleMap center={center} zoom={15}  mapContainerStyle={{ marginLeft: 'auto',width: '70vw', height:'100vh', boxShadow: '3px 14px 32px 4px rgba(0,0,0,0.75)'}}>
                onLoad={map => setMap(map)}
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