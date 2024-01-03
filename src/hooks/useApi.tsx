import { useState, useEffect, useCallback } from 'react';
import { IData } from '../interfaces/data';

const useApi = (endpoints: string[]) => {
  const [data, setData] = useState<IData[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const flattenNestedArray = (arr: any[]): any[] | null => {
    let result: any[] | null = null;
  
    arr.some(item => {      
      if (Array.isArray(item)) {
        result = [].concat(...arr);
        return true;
      }
      return false;
    });
  
    return result;
  }

  const fetchData = useCallback(async() => {
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
      const flattenedArr: any = flattenNestedArray(results);
      
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