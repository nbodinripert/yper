import { FunctionComponent } from 'react';
import './RetailPointItem.css';
import icon from '../../../../assets/yper-icon.png';

interface RetailPointItemProps {
  name: string;
}

const RetailPointItem: FunctionComponent<RetailPointItemProps> = ({ name }) => {
  return (
    <div className="retailPointItem">
      <img src={icon} alt="logo-yper" className="retailPointItem-icon" />
      {name}
    </div>
  );
};

export default RetailPointItem;
