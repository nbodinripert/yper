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
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [retailPoints, setRetailPoints] = useState<RetailPoint[]>([]);

  useEffect(() => {
    const fetchUserAddress = async (): Promise<void> => {
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition(async (location) => {
          if (location) {
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;
            const address = await reverseGeocoding(lat, lng);
            setUserLocation({ lat, lng, address });
          }
        });
      }
    };

    fetchUserAddress().catch(console.error);
  }, []);

  return (
    <RetailPointsContext.Provider
      value={{ userLocation, setUserLocation, retailPoints, setRetailPoints }}
    >
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/retailpoint/:id" element={<RetailPointDetails />} />
      </Routes>
    </RetailPointsContext.Provider>
  );
}

export default App;
