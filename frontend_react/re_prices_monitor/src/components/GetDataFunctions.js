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


export const CityOptions = (setCityOptions) => {

    useEffect(() => {

        fetch("http://localhost:8000/city_options")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parses the JSON response into a JavaScript object
          })
          .then(data => {
            setCityOptions(data);
          })
          .catch(error => {
            console.log("There was an error retrieving the city options: ", error);
          });
    
      }, [setCityOptions]);

};


export const MarketOptions = (setMarketOptions) => {
  
      useEffect(() => {
  
          fetch("http://localhost:8000/market_options")
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json(); // Parses the JSON response into a JavaScript object
            })
            .then(data => {
              setMarketOptions(data);
            })
            .catch(error => {
              console.log("There was an error retrieving the market options: ", error);
            });
      
        }, [setMarketOptions]);
};


export const FetchMultipleData = (selectedCity, selectedMarket, selectedDataType, setChartDataSet, setDatasetLabels) => {

    useEffect(() => {


      const urlsToFetch = []
      const datasetLabels  = []


      if (selectedDataType.length > 1) {
        
        urlsToFetch.push("http://localhost:8000/combined_data/Wrocław/pierwotny");
        datasetLabels.push("Wrocław - rynek pierwotny - combined data");

      } else if (selectedDataType.length > 0) {

          if (selectedDataType[0].value === "Historical data") {

            if (selectedMarket.length > 0 && selectedCity.length > 0) {
              for (let j = 0; j < selectedCity.length; j++) {
                for (let i = 0; i < selectedMarket.length; i++) {
                  urlsToFetch.push("http://localhost:8000/historical_prices/" + selectedCity[j].value + "/" + selectedMarket[i].value);
                  datasetLabels.push(selectedCity[j].value + " - rynek " + selectedMarket[i].value + " - historical data");
                }
              }
            }   
        
          } else {

            if (selectedMarket.length > 0 && selectedCity.length > 0) {
              for (let j = 0; j < selectedCity.length; j++) {
                for (let i = 0; i < selectedMarket.length; i++) {
                  urlsToFetch.push("http://localhost:8000/prices/" + selectedCity[j].value + "/" + selectedMarket[i].value);
                  datasetLabels.push(selectedCity[j].value + " - rynek " + selectedMarket[i].value);
                }
              }
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


    }, [selectedCity, selectedMarket, selectedDataType, setChartDataSet, setDatasetLabels]);

};