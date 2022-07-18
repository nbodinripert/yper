import Slider from 'rc-slider';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import gmapMarker from '../../assets/gmap-marker.png';
import marker from '../../assets/yper-marker.png';
import { GMap } from '../../components/GMap';
import Pin from '../../components/Pin/Pin';
import { API_KEY } from '../../conf/gmaps.conf';
import RetailPointsContext from '../../contexts/RetailPointsContext';
import { getRetailsPoints } from '../../providers/retailsPoints.provider';
import RetailPointItem from './components/RetailPointItem/RetailPointItem';
import './Home.css';

const DEFAULT_DISTANCE = 30; // km

const Home: FunctionComponent = () => {
  //#region contexts
  const {
    userLocation,
    setUserLocation,
    isUserLocationLoading,
    retailPoints,
    setRetailPoints,
  } = useContext(RetailPointsContext);
  //#endregion

  //#region states
  const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  //#endregion

  //#region effects
  useEffect(() => {
    const fetchRetailsPoints = async (): Promise<void> => {
      if (!userLocation) return;
      const results = await getRetailsPoints(
        userLocation!.lat,
        userLocation!.lng,
        distance,
      );
      setRetailPoints(results);
    };
    fetchRetailsPoints().catch((error) => {
      setErrorMsg(error.toString());
    });
  }, [userLocation?.address]);
  //#endregion

  //#region handle methods
  const handlePlaceSelect = (place: Record<string, any>): void => {
    setUserLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address,
    });
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
    <div className="home-body flex-row">
      <div className="home-body-map-wrapper">
        <GMap
          center={
            userLocation
              ? { lat: userLocation.lat, lng: userLocation.lng }
              : undefined
          }
        >
          {userLocation && (
            <Pin
              lat={userLocation.lat}
              lng={userLocation.lng}
              imgSrc={gmapMarker}
              header="Vous êtes ici"
              details={userLocation.address}
            />
          )}
          {retailPoints.map((retailPoint, index) => (
            <Pin
              key={retailPoint.id + '_' + index}
              imgSrc={marker}
              lat={retailPoint.location.lat}
              lng={retailPoint.location.lng}
              header={retailPoint.name}
              details={retailPoint.address}
              linkTo={`/retailpoint/${retailPoint.id}`}
              state={retailPoint}
            />
          ))}
        </GMap>
      </div>
      <div className="home-search">
        <p className="home-search-title">
          Votre adresse postale{' '}
          {isUserLocationLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className="home-search-spinner"
            />
          )}
        </p>
        <ReactGoogleAutocomplete
          apiKey={API_KEY}
          onPlaceSelected={handlePlaceSelect}
          options={{
            componentRestrictions: { country: 'fr' },
            types: ['address'],
          }}
          className="home-search-input"
          defaultValue={userLocation?.address}
        />
        <Alert
          className={errorMsg ? 'home-search-alert' : 'hidden'}
          variant="danger"
        >
          {errorMsg}
        </Alert>
        {userLocation && (
          <div className="flex-col align-items-center">
            <p className="home-search-title">
              Liste des points de ventes à proximité
            </p>
            <Button
              className="home-search-filter-btn"
              variant="secondary"
              onClick={handleFilterBtnClick}
            >
              Filtrer à <span className="home-search-distance">{distance}</span>{' '}
              km de chez vous
            </Button>
            <Slider
              min={1}
              max={50}
              defaultValue={DEFAULT_DISTANCE}
              className="home-search-slider"
              marks={{ 1: 1, 30: 30, 50: 50 }}
              onChange={handleSliderChange}
            />
            {retailPoints && retailPoints.length > 0 ? (
              <div className="home-search-results">
                {retailPoints.map((retailPoint, index) => (
                  <RetailPointItem
                    key={retailPoint.id + '_' + index}
                    retailPoint={retailPoint}
                  />
                ))}
              </div>
            ) : (
              <Alert className="home-search-alert" variant="warning">
                Pas de point de vente disponible, veuillez aggrandir la zone de
                votre recherche
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
  //#endregion
};

export default Home;
