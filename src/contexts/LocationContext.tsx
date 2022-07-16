import { createContext } from 'react';
import Location from '../models/location.model';

interface LocationContextState {
  userLocation: Location | null;
}

const defaultState = {
  userLocation: null,
};

const LocationContext = createContext<LocationContextState>(defaultState);
export default LocationContext;
