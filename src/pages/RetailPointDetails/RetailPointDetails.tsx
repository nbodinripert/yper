import { useLocation } from 'react-router-dom';
import marker from '../../assets/yper-marker.png';
import { GMap } from '../../components/GMap';
import Pin from '../../components/Pin/Pin';
import RetailPoint from '../../models/retailPoint.model';
import './RetailPointDetails.css';

export const RetailPointDetails = () => {
  //#region location
  const location = useLocation();
  //#endregion

  //#region render
  const retailPoint = location.state as RetailPoint;
  const center = {
    lat: retailPoint.location.lat,
    lng: retailPoint.location.lng,
  };
  return (
    <div className="details-body fullscreen">
      <div className="details-map-wrapper">
        <GMap center={center}>
          <Pin
            imgSrc={marker}
            lat={center.lat}
            lng={center.lng}
            header={retailPoint.name}
            details={retailPoint.address}
          />
        </GMap>
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
  //#endregion
};
