import axios from 'axios';
import { API_KEY } from '../conf/gmaps.conf';

export const reverseGeocoding = async (
  lat: number,
  lng: number,
): Promise<string> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`,
    );
    return response.data.results[0]?.formatted_address;
  } catch (error) {
    throw error;
  }
};
