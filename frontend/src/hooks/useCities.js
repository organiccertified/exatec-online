import { useState, useEffect } from 'react';
import { fetchCities } from '../services/citiesService';

/**
 * Custom hook to fetch and manage cities/chapters
 * @returns {Object} { cities, loading, error, refetch }
 */
export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCities();
      setCities(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading cities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  return {
    cities,
    loading,
    error,
    refetch: loadCities
  };
};
