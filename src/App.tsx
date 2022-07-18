import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RetailPointsContext from './contexts/RetailPointsContext';
import Location from './models/location.model';
import RetailPoint from './models/retailPoint.model';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import { RetailPointDetails } from './pages/RetailPointDetails/RetailPointDetails';
import { reverseGeocoding } from './providers/gmaps.provider';

function App() {
  //#region states
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isUserLocationLoading, setIsUserLocationLoading] =
    useState<boolean>(false);
  const [retailPoints, setRetailPoints] = useState<RetailPoint[]>([]);
  //endregion

  //#region effects
  useEffect(() => {
    const fetchUserAddress = async (): Promise<void> => {
      if (navigator?.geolocation) {
        setIsUserLocationLoading(true);
        navigator.geolocation.getCurrentPosition(async (location) => {
          if (location) {
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;
            const address = await reverseGeocoding(lat, lng);
            setUserLocation({ lat, lng, address });
          }
          setIsUserLocationLoading(false);
        });
      }
    };

    fetchUserAddress().catch(console.error);
  }, []);
  //endregion

  //#region render
  return (
    <RetailPointsContext.Provider
      value={{
        userLocation,
        setUserLocation,
        isUserLocationLoading,
        retailPoints,
        setRetailPoints,
      }}
    >
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/retailpoint/:id" element={<RetailPointDetails />} />
      </Routes>
    </RetailPointsContext.Provider>
  );
  //endregion
}

export default App;
