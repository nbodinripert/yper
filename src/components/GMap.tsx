import GoogleMapReact from 'google-map-react';
import { FunctionComponent } from 'react';
import { API_KEY } from '../conf/gmaps.conf';

interface GMapProps {
  center?: {
    lat: number;
    lng: number;
  };
  children: JSX.Element | JSX.Element[];
}

const DEFAULT_ZOOM = 13;
const DEFAULT_CENTER = { lat: 50.69774627685547, lng: 3.169513463973999 };

export const GMap: FunctionComponent<GMapProps> = ({
  center = DEFAULT_CENTER,
  children,
}) => {
  //#region render
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: API_KEY,
      }}
      center={center}
      defaultZoom={DEFAULT_ZOOM}
    >
      {children}
    </GoogleMapReact>
  );
  //#endregion
};
