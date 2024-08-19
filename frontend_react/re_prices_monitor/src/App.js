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
  const [selectedMarket, setSelectedMarket] = useState([market_options[0]]);


  const [chartLabelsDataSet, setChartLabelsDataSet] = useState([]);


  useEffect(() => {

    fetch("http://localhost:8000/prices/Wrocław/pierwotny")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parses the JSON response into a JavaScript object
      })
      .then(data => {
        setChartLabelsDataSet(data);
      })
      .catch(error => {
        console.log("There was an error retrieving the prices list: ", error);
      });

  }, [selectedValue]);



  const [chartDataSet, setChartDataSet] = useState([]);
  const [DatasetLabels, setDatasetLabels] = useState([]);


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

  }, [selectedValue, selectedMarket]);


 

  const handleChangeCity = (selected) => {
    setSelectedCity(selected || []);
  };


  const handleChangeMarket = (selected) => {
    setSelectedMarket(selected || []);
  };




  const datasetList = [];
  const datasetColors = ["black", "orange", "grey", 'rgba(75, 192, 192, 1)'];
 
  for (let i = 0; i < chartDataSet.length; i++) {
    datasetList.push({
      label: DatasetLabels[i] + " [PLN/m2]",
      data: chartDataSet[i].map((price) => price.m2_price),
      borderColor: datasetColors[i],
      borderWidth: 2
    });
  }

  var chartData = {
    labels: chartLabelsDataSet.map((price) => price.date),
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
        <SummaryTable prices={prices}/>
      </div>

    </div>
  );
}

export default App;
