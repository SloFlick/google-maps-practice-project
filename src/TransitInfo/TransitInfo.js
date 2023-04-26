
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faPersonWalking, faTrain } from '@fortawesome/free-solid-svg-icons'
import './TransitInfo.css'

const TransitInfo = ({departureTime, travelDuration, lineName, vehicleType, travelDistance, travelMode, departureStop, arrivalStop}) => {
    
    // const info = props[0]

    // const [departureTime, setDepartureTime] = useState('')
    // const [travelDuration, setTravelDuration] = useState('')
    // const [lineName, setLineName] = useState('')
    // const [vehicleType, setVehicleType] = useState('')  

    // useEffect(() => {
    //     const transitInfo = info.transit
    //     setTravelDuration(info.duration.text)
    //     setDepartureTime(info.transit.departure_time.text)
    //     setLineName(transitInfo.line.short_name)
    //     setVehicleType(transitInfo.line.vehicle.name)
    //   }, [info]);

    if(vehicleType === 'Avtobus') {
        return (
            <div className="info-card">
                <div className="info">
                    <FontAwesomeIcon className="icon" icon={faBusSimple} />  
                    <div className="text-info">
                        <h1>{departureStop}</h1>
                        <h1>{travelDuration}</h1>
                        <h1>{arrivalStop}</h1>
                    </div>
                    <p>Departure: {departureTime}</p>
                </div>
            </div>
        )
    }
    else if(vehicleType === 'Vlak') {
        return(
            <div className="info-card">
                <div className="info">
                    <FontAwesomeIcon className='icon' icon={faTrain} />  
                    <div className="text-info">
                    <h1>{departureStop}</h1>
                    <h1>{travelDuration}</h1>
                    <h1>{arrivalStop}</h1>
                    </div>
                    <p>Departure: {departureTime}</p>

                </div>
            </div>
        )
    } else if(travelMode === 'WALKING') {
        return(
            <div className="info-card">
                <div className="info">
                    <FontAwesomeIcon className='icon' icon={faPersonWalking} />
                    <div className="text-info-walking">
                        <h1>{travelDistance}</h1>
                        <h1>{travelDuration}</h1>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className="info-card">
                <div className="info">
                    <FontAwesomeIcon className='icon' icon={faTrain} />  
                    <div className="text-info">
                    <h1>{departureStop}</h1>
                    <h1>{travelDuration}</h1>
                    <h1>{arrivalStop}</h1>
                    </div>
                    <p>Departure: {departureTime}</p>

                </div>
            </div>
        </div>
    )
}

export default TransitInfo