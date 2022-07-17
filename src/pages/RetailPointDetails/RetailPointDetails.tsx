import GoogleMapReact from 'google-map-react';
import { useLocation } from 'react-router-dom';
import marker from '../../assets/yper-marker.png';
import Pin from '../../components/Pin';
import RetailPoint from '../../models/retailPoint.model';
import './RetailPointDetails.css';

const DEFAULT_ZOOM = 13;

export const RetailPointDetails = () => {
  const location = useLocation();
  const retailPoint = location.state as RetailPoint;
  console.log(retailPoint);
  const center = {
    lat: retailPoint.location.lat,
    lng: retailPoint.location.lng,
  };

  return (
    <div className="details-body">
      <div className="details-map-wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCNemhlRhzcu8bF9WzTZOZtyPdWWPL5O-k',
          }}
          defaultCenter={center}
          defaultZoom={DEFAULT_ZOOM}
        >
          <Pin lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </div>
      <div className="details-data">
        <p className="details-data-h1">
          <img src={marker} alt="" style={{ width: '20px' }} />
          {retailPoint.name}
        </p>
        <p className="details-data-h3">{retailPoint.address}</p>
        <p className="details-data-h2">Horaires d&apos;ouverture</p>
        <p className="details-data-h3">
          {retailPoint.opening_hours !== ''
            ? retailPoint.opening_hours
            : 'Fermé'}
        </p>
      </div>
    </div>
  );
};
