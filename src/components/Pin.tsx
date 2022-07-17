import { FunctionComponent } from 'react';
import marker from '../assets/yper-marker.png';

interface PinProps {
  lat: number;
  lng: number;
}

const Pin: FunctionComponent<PinProps> = () => {
  return (
    <img
      src={marker}
      alt="yper-marker"
      style={{ width: '35px', cursor: 'pointer' }}
    />
  );
};

export default Pin;
