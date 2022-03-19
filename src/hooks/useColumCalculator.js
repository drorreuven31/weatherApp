import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useColumCalculator(startColumns=2) {
  
  const [columnNumber, setcolumnNumber] = useState(
    startColumns
  )

  useEffect(() => {
    function handleResize() {
      let newColumnNumber = Math.floor(getWindowDimensions().width/250);
      setcolumnNumber(prev=>newColumnNumber)
      
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columnNumber;
}
