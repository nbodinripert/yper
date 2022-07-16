import Slider from 'rc-slider';
import { FunctionComponent, useContext, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import RetailPointsContext from '../../contexts/RetailPointsContext';
import Location from '../../models/location.model';
import { getRetailsPoints } from '../../providers/retailsPoints.provider';
import './Home.css';

const DEFAULT_DISTANCE = 30;

const Home: FunctionComponent = () => {
  //#region contexts
  const { retailPoints, setRetailPoints } = useContext(RetailPointsContext);
  //#endregion

  //#region states
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  //#endregion

  //#region handle methods
  const handlePlaceSelect = async (
    place: Record<string, any>,
  ): Promise<void> => {
    try {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const results = await getRetailsPoints(lat, lng, distance);
      setUserLocation({
        lat,
        lng,
      });
      setRetailPoints(results);
    } catch (error) {
      setErrorMsg(error.toString());
    }
  };

  const handleInputChange = (): void => {
    if (errorMsg) setErrorMsg('');
    if (userLocation) setUserLocation(null);
    if (retailPoints.length > 0) setRetailPoints([]);
    if (distance !== DEFAULT_DISTANCE) setDistance(DEFAULT_DISTANCE);
  };

  const handleSliderChange = (evt: any): void => {
    setDistance(evt);
  };

  const handleFilterBtnClick = async (): Promise<void> => {
    try {
      const results = await getRetailsPoints(
        userLocation!.lat,
        userLocation!.lng,
        distance,
      );
      setRetailPoints(results);
    } catch (error) {
      setErrorMsg(error.toString());
    }
  };
  //#endregion

  //#region render
  return (
    <div className="home-body flex-row justify-content-center align-items-center">
      <div className="home-card">
        <p className="home-card-label">Votre adresse postale</p>
        <ReactGoogleAutocomplete
          apiKey={'AIzaSyCNemhlRhzcu8bF9WzTZOZtyPdWWPL5O-k'}
          onPlaceSelected={handlePlaceSelect}
          onChange={handleInputChange}
          options={{
            componentRestrictions: { country: 'fr' },
            types: ['address'],
          }}
          className="home-card-input"
        />
        <Alert
          className={errorMsg ? 'home-card-alert' : 'hidden'}
          variant="danger"
        >
          {errorMsg}
        </Alert>
        {userLocation && (
          <div>
            <p className="home-card-results-title">
              Liste des points de ventes à proximité
            </p>
            <Button
              className="home-card-filter-btn"
              variant="outline-secondary"
              onClick={handleFilterBtnClick}
            >
              Filtrer à <span className="home-card-distance">{distance}</span>{' '}
              km de chez vous
            </Button>
            <Slider
              min={1}
              max={50}
              defaultValue={DEFAULT_DISTANCE}
              className="home-card-slider"
              marks={{ 1: 1, 30: 30, 50: 50 }}
              onChange={handleSliderChange}
            />
            <div className="home-card-results">
              {retailPoints.map((retailPoint, index) => (
                <div
                  key={retailPoint.id + '_' + index}
                  className="home-card-retailPoint"
                >
                  {retailPoint.name}
                </div>
              ))}
            </div>
            <Alert
              className={
                !retailPoints || retailPoints.length === 0
                  ? 'home-card-alert'
                  : 'hidden'
              }
              variant="warning"
            >
              Il n&apos;y a aucun points de vente dans les {distance} kilomètres
              autour de votre adresse
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
  //#endregion
};

export default Home;
