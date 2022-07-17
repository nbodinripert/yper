import Location from './location.model';

interface RetailPoint {
  id: string;
  name: string;
  address: string;
  opening_hours: string;
  location: Location;
}

export default RetailPoint;
