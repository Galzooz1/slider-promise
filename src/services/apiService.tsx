import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { IData } from '../interfaces/data';

const useApi = (endpoints: string[]) => {
  const [data, setData] = useState<IData | undefined | any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async() => {
    console.log(endpoints);
    try {
      setLoading(true);

      const requests = endpoints.map(url =>
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok for ${url}`);
            }
            return response.json();
          })
      );

      const results = await Promise.all(requests);
      const flattenedArr = [].concat(...results);
      
      setData(flattenedArr);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [endpoints]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useApi;