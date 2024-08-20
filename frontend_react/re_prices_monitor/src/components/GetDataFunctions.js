import { useEffect } from "react";


export const LastPrices = (setPrices) => {
    useEffect(() => {

        fetch("http://localhost:8000/prices/")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parses the JSON response into a JavaScript object
          })
          .then(data => {
            setPrices(data);
          })
          .catch(error => {
            console.log("There was an error retrieving the prices list: ", error);
          });
    
      }, [setPrices]);
};


export const ChartXaxisLabels = (setChartXaxisLabels) => {

    useEffect(() => {

        fetch("http://localhost:8000/prices/Wrocław/pierwotny")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parses the JSON response into a JavaScript object
          })
          .then(data => {
            setChartXaxisLabels(data);
          })
          .catch(error => {
            console.log("There was an error retrieving the chart labels: ", error);
          });
    
      }, [setChartXaxisLabels]);
};

