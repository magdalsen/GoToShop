import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import { useUserContext } from '../contexts/UserContext';

const LocationMarker = () => {
    const {city,getCity}=useUserContext();
    function LocationMarker() {
        const [position, setPosition] = useState<LatLng | null>(null);

        const fetchFn = async (params: LatLng) => {
            const settings = {
                "async": true,
                "crossDomain": true,
                "method": "GET"
              }
              const response = await fetch(`https://eu1.locationiq.com/v1/reverse?key=pk.11d3aea98067b9fdbe82ca2fd241d779&lat=${params.lat}&lon=${params.lng}&format=json`, settings);
              const jsonData = await response.json();
              getCity(jsonData.address.city);
        }

        
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            fetchFn(e.latlng);
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here: {city}</Popup>
          </Marker>
        )
      }
      
    return (
        <>
          <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}
                style={{height: 400, width: 600}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </>
    )
}

export default LocationMarker