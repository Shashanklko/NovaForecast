import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setPermissionDenied(false);
        setLoading(false);
      },
      (err) => {
        // Check specific error codes
        if (err.code === 1) {
          // PERMISSION_DENIED
          setPermissionDenied(true);
          setError('Location access denied. Please enable location permission to get weather for your current location.');
        } else if (err.code === 2) {
          // POSITION_UNAVAILABLE
          setError('Location is unavailable. Please check your device settings.');
        } else if (err.code === 3) {
          // TIMEOUT
          setError('Location request timed out. Please try again.');
        } else {
          setError(err.message || 'Failed to get location');
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { coords, error, loading, permissionDenied };
};

