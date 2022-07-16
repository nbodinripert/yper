import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RetailPointsContext from './contexts/RetailPointsContext';
import RetailPoint from './models/retailPoint.model';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';

function App() {
  const [retailPoints, setRetailPoints] = useState<RetailPoint[]>([]);
  return (
    <RetailPointsContext.Provider value={{ retailPoints, setRetailPoints }}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </RetailPointsContext.Provider>
  );
}

export default App;
