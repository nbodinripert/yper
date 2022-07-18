import { FunctionComponent } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import marker from '../../assets/yper-marker.png';
import './Pin.css';

interface PinProps {
  lat: number;
  lng: number;
  header?: string;
  details?: string;
  linkTo?: string;
  state?: any;
}

const Pin: FunctionComponent<PinProps> = (props) => {
  //#region render
  return (
    <OverlayTrigger
      trigger={['hover', 'hover']}
      placement="top-start"
      overlay={
        <Popover>
          <Popover.Header>{props.header}</Popover.Header>
          <Popover.Body className="yper-pin-body">{props.details}</Popover.Body>
        </Popover>
      }
    >
      {props.linkTo ? (
        <Link to={props.linkTo} state={props.state}>
          <img src={marker} alt="yper-marker" className="yper-pin" />
        </Link>
      ) : (
        <img src={marker} alt="yper-marker" className="yper-pin" />
      )}
    </OverlayTrigger>
  );
  //#endregion
};

export default Pin;
