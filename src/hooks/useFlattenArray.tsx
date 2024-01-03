import React from 'react';

interface UseFlattenArrayProps {
    arr: any[];
}

export const useFlattenArray = ({arr}:UseFlattenArrayProps) => {

    let result: any[] | null = null;
  
    arr.some((item) => {      
      if (Array.isArray(item)) {
        result = [].concat(...arr);
        return true;
      }
      return false;
    });
  
    return result;
};

export default useFlattenArray;