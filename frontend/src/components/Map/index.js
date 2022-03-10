import Map, { AttributionControl, FullscreenControl, Marker } from 'react-map-gl'
import styles from "./styles.module.scss"

export default function MapGL({actived}) {
  console.log(actived);
  
  return (
    <div className={styles.mapContainer} id={!actived && styles.disabled}>
      <Map
        initialViewState={{ latitude: -22.9125953, longitude: -43.2247835, zoom: 15 }}
        style={{ width: 900, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoibXZnb2xpdmVpcmEiLCJhIjoiY2wwbDdlcm5oMHRwdDNmcWtnZXYxc2kzbiJ9.ckDPiWO2jWq40oSS9RhGxg"
        attributionControl={false}
      >
        <FullscreenControl/>
        <AttributionControl customAttribution="Localização do Ramo" style={{ color: "#000" }}/>
        <Marker latitude={-22.9125953} longitude={-43.2247835} anchor="center" color="#0D5FAA"/>
      </Map>
    </div>
  )
}