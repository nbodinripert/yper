import { FunctionComponent, useState } from 'react';
import { Form } from 'react-bootstrap';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import Location from '../../models/location.model';
import './Home.css';

const Home: FunctionComponent = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const onPlaceSelected = (place: Record<string, any>) => {
    const newUserLocation = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lon(),
    };
    setUserLocation(newUserLocation);
  };

  //#region render
  return (
    <div className="home-body flex-row justify-content-center align-items-center">
      <Form className="home-form">
        <p className="home-form-label">Votre adresse postale</p>
        <ReactGoogleAutocomplete
          apiKey={'AIzaSyCNemhlRhzcu8bF9WzTZOZtyPdWWPL5O-k'}
          onPlaceSelected={onPlaceSelected}
          onChange={() => {
            console.log('coucou');
          }}
          options={{
            componentRestrictions: { country: 'fr' },
            types: ['address'],
          }}
          className="home-form-input"
        />
      </Form>
    </div>
  );
  //#endregion
};

export default Home;
