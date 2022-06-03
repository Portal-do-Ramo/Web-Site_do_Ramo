import Map, { AttributionControl, FullscreenControl, Marker } from 'react-map-gl'
import styles from "./styles.module.scss"

export default function MapGL({actived}) {  
  return (
    <div className={styles.mapContainer} id={!actived && styles.disabled}>
      <Map
        initialViewState={{ latitude: -22.9125953, longitude: -43.2247835, zoom: 15 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.MAPBOX_SECRET_KEY}
        attributionControl={false}
      >
        <FullscreenControl/>
        <AttributionControl customAttribution="Localização do Ramo" style={{ color: "#000" }}/>
        <Marker latitude={-22.9125953} longitude={-43.2247835} anchor="center" color="#0D5FAA"/>
      </Map>
    </div>
  )
}