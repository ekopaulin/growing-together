import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import styles from './MapSection.module.css';

// Fix for default marker icon missing in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Gold Marker to match the theme
const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Yaoundé Coordinates
const mapCenter = [3.8480, 11.5021]; 

const markers = [
  { id: 1, position: [3.8480, 11.5021], title: 'Siège & Rencontres', desc: 'Notre base d\'opérations au centre-ville de Yaoundé.' },
  { id: 2, position: [3.8820, 11.5200], title: 'Quartier Nord (Fictif)', desc: 'Lieu de notre grande distribution de kits scolaires 2024.' },
  { id: 3, position: [3.8200, 11.4800], title: 'Quartier Sud (Fictif)', desc: 'Ateliers sur l\'inclusion et la citoyenneté.' },
];

export default function MapSection() {
  return (
    <section id="actions" className={`section ${styles.mapSection}`}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow eyebrow-gold">Notre Terrain d'Action</span>
          <h2 className="section-title">
            Nous agissons au <span className="highlight">coeur de Yaoundé</span>
          </h2>
          <p className="section-sub">
            Découvrez nos principaux lieux d'intervention. Chaque point sur la carte représente une action concrète pour l'épanouissement des jeunes de la communauté.
          </p>
        </div>

        <div className={styles.mapWrapper}>
          <MapContainer 
            center={mapCenter} 
            zoom={12} 
            scrollWheelZoom={false}
            zoomControl={false}
            className={styles.map}
          >
            {/* Minimalist Map Tiles for Premium Look */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <ZoomControl position="bottomright" />

            {markers.map(marker => (
              <Marker key={marker.id} position={marker.position} icon={goldIcon}>
                <Popup className={styles.customPopup}>
                  <strong>{marker.title}</strong>
                  <p>{marker.desc}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
