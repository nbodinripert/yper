import { createContext } from 'react';
import Location from '../models/location.model';
import RetailPoint from '../models/retailPoint.model';

interface RetailsPointsContextState {
  userLocation: Location | null;
  setUserLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  isUserLocationLoading: boolean;
  retailPoints: RetailPoint[];
  setRetailPoints: React.Dispatch<React.SetStateAction<RetailPoint[]>>;
}

const defaultState = {
  userLocation: null,
  setUserLocation: () => {},
  isUserLocationLoading: false,
  retailPoints: [],
  setRetailPoints: () => {},
};

const RetailPointsContext =
  createContext<RetailsPointsContextState>(defaultState);
export default RetailPointsContext;
