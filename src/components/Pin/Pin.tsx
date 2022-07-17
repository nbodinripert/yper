import { FunctionComponent } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import marker from '../../assets/yper-marker.png';
import './Pin.css';

interface PinProps {
  lat: number;
  lng: number;
  header?: string;
  details?: string;
}

const Pin: FunctionComponent<PinProps> = (props) => {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top-start"
      overlay={
        <Popover>
          <Popover.Header>{props.header}</Popover.Header>
          <Popover.Body className="yper-pin-body">{props.details}</Popover.Body>
        </Popover>
      }
    >
      <img src={marker} alt="yper-marker" className="yper-pin" />
    </OverlayTrigger>
  );
};

export default Pin;
