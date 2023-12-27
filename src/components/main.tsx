import React, { useEffect, useMemo, useState } from 'react';
// import { IData } from '../interfaces/data';
import Slider from './slider';
import useApi from '../services/apiService';

interface MainProps {
    
};

const Main: React.FC<MainProps> = () => {
    const apiUrls = [
        // 'https://jsonplaceholder.typicode.com/todos/1',
        // 'https://jsonplaceholder.typicode.com/todos/2',
        // 'https://jsonplaceholder.typicode.com/todos/3',
        'https://api.thecatapi.com/v1/images/search',
        'https://api.thedogapi.com/v1/images/search'
      ];
    
      const { data, loading, error } = useApi(apiUrls);
      console.log(data);
      
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }
        
    return(
        <main className='main'>
            <Slider data={data} />
        </main>
    )
}

export default Main