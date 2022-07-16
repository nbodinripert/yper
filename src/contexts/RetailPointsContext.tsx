import { createContext } from 'react';
import RetailPoint from '../models/retailPoint.model';

interface RetailsPointsContextState {
  retailPoints: RetailPoint[];
  setRetailPoints: React.Dispatch<React.SetStateAction<RetailPoint[]>>;
}

const defaultState = {
  retailPoints: [],
  setRetailPoints: () => {},
};

const RetailPointsContext =
  createContext<RetailsPointsContextState>(defaultState);
export default RetailPointsContext;
