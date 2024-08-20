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


export const FetchMultipleData = (selectedValue, selectedMarket, setChartDataSet, setDatasetLabels) => {

  useEffect(() => {

    const urlsToFetch = []
    const datasetLabels  = []

    if (selectedMarket.length > 0 && selectedValue.length > 0) {
      for (let j = 0; j < selectedValue.length; j++) {
        for (let i = 0; i < selectedMarket.length; i++) {
          urlsToFetch.push("http://localhost:8000/prices/" + selectedValue[j].value + "/" + selectedMarket[i].value);
          datasetLabels.push(selectedValue[j].value + " - rynek " + selectedMarket[i].value);
        }
      }
    } 

    setDatasetLabels(datasetLabels);

    Promise.all(urlsToFetch.map(url => fetch(url).then(response => response.json())))
      .then(responses => {
        setChartDataSet(responses);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [selectedValue, selectedMarket, setChartDataSet, setDatasetLabels]);

};