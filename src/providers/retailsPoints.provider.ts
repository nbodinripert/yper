import axios from '../conf/axios.conf';
import RetailPoint from '../models/retailPoint.model';

export const getRetailsPoints = async (
  lat: number,
  lng: number,
  distance: number,
): Promise<RetailPoint[]> => {
  try {
    const response = await axios.get('retailpoint/search', {
      params: {
        location: `${lat},${lng}`,
        max_distance: distance * 1000,
        limit: 10,
      },
    });

    return response.data.result.map((result: Record<string, any>) => ({
      id: result._id,
      name: result.name,
      address: result.address.formatted_address,
      opening_hours: result.opening_hours,
      location: {
        lat: result.address.location.coordinates[1],
        lng: result.address.location.coordinates[0],
      },
    }));
  } catch (error) {
    throw error;
  }
};
