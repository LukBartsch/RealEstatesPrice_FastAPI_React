import logo from './logo.svg';
import './App.css';

import React from 'react';
//import api from './api.js';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import LineChart from "./components/LineChart";
import SummaryTable from './components/SummaryTable';
import SelectMenus from './components/SelectMenus';

import { useEffect, useState } from "react";


Chart.register(CategoryScale);



function App() {



  const [prices, setPrices] = useState([]);

  // const fetchPrices = async () => {
  //   const response = await api.get('/prices/');
  //   setPrices(response.data);
  // };

  // useEffect(() => {
  //   fetchPrices();
  // }, []);



  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     const response = await api.get('/prices/');
  //     setPrices(response.data);
  //   };

  //   fetchPrices();
  // }, []);



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

  }, []);



  const city_options = [
    { value: 'Wrocław', label: 'Wrocław' },
    { value: 'Ostrów Wlkp.', label: 'Ostrów Wlkp.' },
  ]

  const market_options = [
    { value: 'pierwotny', label: 'pierwotny' },
    { value: 'wtorny', label: 'wtórny' },
  ]
  
  const [selectedValue, setSelectedCity] = useState([city_options[0]]);
  //const [selectedMarket, handleChangeMarket] = useState(market_options[0]);
  const [selectedMarket, setSelectedMarket] = useState([market_options[0]]);



  //console.log("Selected value: ", selectedValue);



  const [chartDataSet, setChartDataSet] = useState([]);
  const [chartDataSet_2, setChartDataSet_2] = useState([]);





  useEffect(() => {

    fetch("http://localhost:8000/prices/" + selectedValue[0].value + "/pierwotny")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parses the JSON response into a JavaScript object
      })
      .then(data => {
        setChartDataSet(data);
      })
      .catch(error => {
        console.log("There was an error retrieving the prices list: ", error);
      });

  }, [selectedValue]);


  useEffect(() => {

    fetch("http://localhost:8000/prices/" + selectedValue[0].value + "/wtorny")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parses the JSON response into a JavaScript object
      })
      .then(data => {
        setChartDataSet_2(data);
      })
      .catch(error => {
        console.log("There was an error retrieving the prices list: ", error);
      });

  }, [selectedValue]);



  
  // const urlsToFetch = [
  //     "http://localhost:8000/prices/Wrocław/pierwotny",
  //     "http://localhost:8000/prices/Wrocław/wtorny",
  // ];

  // const fetchPromises = urlsToFetch.map(url => 
  //     fetch(url)
  //         .then(response => response.json())
  // );

  // Promise.all(fetchPromises)
  //     .then(responses => {
  //         const responseData = responses.map(response => response);
  //         //console.log('Fetched data:', responseData);
  //         return responseData.data;

  //     })
  //     .catch(error => console.error('Error fetching data:', error));


  // console.log("Promises ", fetchPromises);



  //console.log("Market:", selectedMarket);



  // const choices = [];


  // if (Array.isArray(selectedMarket)) {
  //   for (let i = 0; i < selectedMarket.length; i++) {
  //     choices.push(selectedMarket[i].value);
  //   }
  // } else {
  //   choices.push(selectedMarket.value);
  // }





  
  
  // Or combine them into one state variable
  //const [allResponsesData, setAllResponsesData] = useState([]);







  //const [dataset, setDataset] = useState([]);

  const [chartDataSet_test, setChartDataSet_test] = useState([]);

  const [DatasetLabels, setDatasetLabels] = useState([]);


  useEffect(() => {

    //const urlsToFetch = []

    const urls_test = []

    const dataset_labels  = []

    //var markets = ""

    if (selectedMarket.length > 0 && selectedValue.length > 0) {
      for (let j = 0; j < selectedValue.length; j++) {
        for (let i = 0; i < selectedMarket.length; i++) {
          //markets += selectedMarket[i].value + ",";
          urls_test.push("http://localhost:8000/prices/" + selectedValue[j].value + "/" + selectedMarket[i].value);
          dataset_labels.push(selectedValue[j].value + " - rynek " + selectedMarket[i].value);
        }
      }
      //urlsToFetch.push("http://localhost:8000/prices/" + selectedValue.value + "/" + markets);
    } 

    setDatasetLabels(dataset_labels);

    Promise.all(urls_test.map(url => fetch(url).then(response => response.json())))
      .then(responses => {
        setChartDataSet_test(responses);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


  // fetch(urlsToFetch[0](url => url))
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json(); // Parses the JSON response into a JavaScript object
  //   })
  //   .then(data => {
  //     setChartDataSet_test(data);
  //   })
  //   .catch(error => {
  //     console.log("There was an error retrieving the prices list: ", error);
  //   });


  }, [selectedValue, selectedMarket]);


  //console.log("Chart data test: ", chartDataSet_test);




  const handleChangeCity = (selected) => {

    setSelectedCity(selected || []);
  };




  const handleChangeMarket = (selected) => {

    setSelectedMarket(selected || []);
  };






  const datasetList = [];
  const datasetColors = ["black", "orange", "grey", 'rgba(75, 192, 192, 1)'];
 
  for (let i = 0; i < chartDataSet_test.length; i++) {
    datasetList.push({
      //label: selectedValue.value + " - rynek " + (i === 0 ? "pierwotny" : "wtórny") + " [PLN/m2]",
      label: DatasetLabels[i] + " [PLN/m2]",
      data: chartDataSet_test[i].map((price) => price.m2_price),
      borderColor: datasetColors[i],
      borderWidth: 2
    });
  }


  //console.log("Data table: ", dataset_list);



  
  var chartData = {
    // ...chart data

    labels: chartDataSet.map((price) => price.date),
    datasets: [
      {
        label: selectedValue.value + " - rynek pierwotny [PLN/m2]",
        data: chartDataSet.map((price) => price.m2_price),
        borderColor: "black",
        borderWidth: 2
      },
      {
        label: selectedValue.value + " - rynek wtórny [PLN/m2]",
        data: chartDataSet_2.map((price) => price.m2_price),
        borderColor: "orange",
        borderWidth: 2
      }
    ]
  };




  var chartData2 = {
    // ...chart data

    labels: chartDataSet.map((price) => price.date),
    datasets: datasetList
  };










  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome in Real Estate Prices Monitor Application</h3>
      </header>

      {/* <div>Add your components...</div> */}

      <div className='Single-Box-Div'>
        <SelectMenus city_options={city_options} market_options={market_options} 
                      selectedValueCity={selectedValue} selectedValueMarket={selectedMarket} 
                      handleChangeCity={handleChangeCity} handleChangeMarket={handleChangeMarket} />
      </div>

      <div className='Single-Box-Div'>
        <LineChart chartData={chartData} />
      </div>

      <div className='Single-Box-Div'>
        <LineChart chartData={chartData2} />
      </div>

      <div className='Single-Box-Div'>
        <SummaryTable prices={prices}/>
      </div>

    </div>
  );
}

export default App;
