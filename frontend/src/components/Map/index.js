import Map, { AttributionControl, FullscreenControl, Marker } from 'react-map-gl'
import styles from "./styles.module.scss"

export default function MapGL({actived}) {
  return (
    <div className={styles.mapContainer} id={!actived && styles.disabled}>
      <Map
        initialViewState={{ latitude: -22.911757475702384, longitude: -43.224460062225745, zoom: 15 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.MAPBOX_SECRET_KEY}
        attributionControl={false}
      >
        <FullscreenControl/>
        <AttributionControl customAttribution="Localização do Ramo" style={{ color: "#000" }}/>
        <Marker latitude={-22.912055253984374} longitude={-43.22404465951901} anchor="center" color="#0D5FAA"/>
      </Map>
    </div>
  )
}