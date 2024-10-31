import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { useState, useEffect} from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};

//Set default map center to University of Sydney
const center = {
  lat: -33.8886,
  lng: 151.1873
};

export default function MapAPI({sendMarkerPosition, initMarkerPosition, visible}) {

  const [showMarker, setShowMarker] = useState();
  const open = Boolean(showMarker);

  
  const [position, setPosition] = useState()


  useEffect( () => {
    if(initMarkerPosition != null) {
      setPosition(JSON.parse(initMarkerPosition))
    }else{
      setPosition({
        lat: -33.8886,
        lng: 151.1873
      })
    }
    setShowMarker(visible)
  }, [initMarkerPosition, visible])
  

  const marker = <Marker
    visible = {open}
    position={position}
  />


  const handleMapClick = (e) => {
    console.log("THIS IS HAPPENING")
    console.log(e)
    console.log(e.latLng.lat)
    
    setShowMarker(!Boolean(showMarker))
    setPosition(e.latLng)
    console.log(open)
    console.log(showMarker)
    sendMarkerPosition(e.latLng, !open)
    
  }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAQYzzWQXl93VjFABWPic6jL6zo4G-NPb8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick = {(e) => handleMapClick(e)}
      >
        { /* Child components go here, such as markers, info windows, etc. */ }
        <>
          <Marker
            visible = {open}
            position={position}
          />
        </>
      </GoogleMap>
    </LoadScript>
  )
}