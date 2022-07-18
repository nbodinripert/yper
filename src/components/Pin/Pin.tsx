import { FunctionComponent } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Pin.css';

interface PinProps {
  imgSrc: string;
  lat: number;
  lng: number;
  header?: string;
  details?: string;
  linkTo?: string;
  state?: any;
}

const Pin: FunctionComponent<PinProps> = (props) => {
  //#region navigate
  const navigate = useNavigate();
  //#endregion

  //#region handle methods
  const handleImgClick = () => {
    if (props.linkTo) {
      navigate(props.linkTo, { state: props.state });
    }
  };
  //#endregion

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
      <img
        src={props.imgSrc}
        alt="yper-marker"
        className="yper-pin"
        onClick={handleImgClick}
      />
    </OverlayTrigger>
  );
  //#endregion
};

export default Pin;
