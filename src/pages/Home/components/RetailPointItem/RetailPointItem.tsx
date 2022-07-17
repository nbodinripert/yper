import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../../../assets/yper-icon.png';
import RetailPoint from '../../../../models/retailPoint.model';
import './RetailPointItem.css';

interface RetailPointItemProps {
  retailPoint: RetailPoint;
}

const RetailPointItem: FunctionComponent<RetailPointItemProps> = ({
  retailPoint,
}) => {
  //#region render
  return (
    <Link
      to={`/retailpoint/${retailPoint.id}`}
      state={retailPoint}
      className="retailPointItem"
    >
      <img src={icon} alt="logo-yper" className="retailPointItem-icon" />
      {retailPoint.name}
    </Link>
  );
  //#endregion
};

export default RetailPointItem;
