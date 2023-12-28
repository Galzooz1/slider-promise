import React from 'react';
import Slider from './slider';
import useApi from '../hooks/useApi';

interface MainProps {
    
};

const Main: React.FC<MainProps> = () => {
    const apiUrls = [
        'https://api.thedogapi.com/v1/images/search',
        'https://api.thecatapi.com/v1/images/search',
        'https://api.thedogapi.com/v1/images/search',
        'https://api.thecatapi.com/v1/images/search',
        'https://api.thedogapi.com/v1/images/search'
      ];
    
      const { data, loading, error } = useApi(apiUrls);
      console.log(data);
      
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        console.log(error);
        return <p>There's a problem, Try again later.</p>;
      }
        
    return(
        <main className='main'>
            <Slider data={data} />
        </main>
    )
}

export default Main