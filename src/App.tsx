import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RetailPointsContext from './contexts/RetailPointsContext';
import RetailPoint from './models/retailPoint.model';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import { RetailPointDetails } from './pages/RetailPointDetails/RetailPointDetails';

function App() {
  const [retailPoints, setRetailPoints] = useState<RetailPoint[]>([]);
  return (
    <RetailPointsContext.Provider value={{ retailPoints, setRetailPoints }}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/retailpoint/:id" element={<RetailPointDetails />} />
      </Routes>
    </RetailPointsContext.Provider>
  );
}

export default App;
