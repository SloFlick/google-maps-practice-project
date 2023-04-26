import React from "react";
import TransitInfo from "../TransitInfo/TransitInfo";

const TransitInfoCard = ({props}) => {
    console.log(props)
    return (
        <div>
            {
                props.map((info, i) => {
                    if(props[i].transit !== undefined) {
                        console.log(props[i].transit.departure_stop.name)
                    return (
                        <TransitInfo
                            key={i}
                            departureStop = {props[i].transit.departure_stop.name}
                            arrivalStop = {props[i].transit.arrival_stop.name}
                            departureTime = {props[i].transit.departure_time.text}
                            travelDuration = {props[i].duration.text}
                            travelDistance = {props[i].distance.text}
                            lineName = {props[i].transit.line.name}
                            vehicleType = {props[i].transit.line.vehicle.name}

                    />
                    )
                    } else {
                        return (
                            <TransitInfo
                            key={i}
                            travelDuration = {props[i].duration.text}
                            travelDistance = {props[i].distance.text}
                            travelMode = {props[i].travel_mode}
                            />
                        )
                    }
                })
            }
        </div>
    )
}

export default TransitInfoCard