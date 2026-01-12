import { buildApiUrl } from '../config/api';

/**
 * Fetch all cities/chapters from the API
 * @returns {Promise<Array>} Array of city objects
 */
export const fetchCities = async () => {
  try {
    const response = await fetch(buildApiUrl('/cities'));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to fetch cities');
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    // Return fallback cities if API fails
    return [
      { id: 1, name: 'Dallas', slug: 'dallas' },
      { id: 2, name: 'New York', slug: 'new-york' },
      { id: 3, name: 'Chicago', slug: 'chicago' }
    ];
  }
};

/**
 * Fetch a single city by slug
 * @param {string} citySlug - The slug of the city
 * @returns {Promise<Object>} City object
 */
export const fetchCityBySlug = async (citySlug) => {
  try {
    const response = await fetch(buildApiUrl(`/cities/${citySlug}`));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch city: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to fetch city');
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
};
