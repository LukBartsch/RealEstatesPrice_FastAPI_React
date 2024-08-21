import logo from './logo.svg';
import './App.css';

import React from 'react';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { LastPrices, CityOptions, MarketOptions, FetchMultipleData } from './components/GetDataFunctions';

import LineChart from "./components/LineChart";
import SummaryTable from './components/SummaryTable';
import SelectMenus from './components/SelectMenus';

import { useState } from "react";


Chart.register(CategoryScale);


function App() {


  const [prices, setPrices] = useState([]);
  LastPrices(setPrices);


  const [cityOptionsFromDB, setCityOptions] = useState([]);
  CityOptions(setCityOptions);

  const cityOptions = []
  if (cityOptionsFromDB.length === 0) {
    cityOptions.push({value: 'Wrocław', label: 'Wrocław'})
  } else {
    for (let i = 0; i < cityOptionsFromDB.length; i++) {
      cityOptions.push({ value: cityOptionsFromDB[i].city_name, label: cityOptionsFromDB[i].city_name });
    }
  }

  const [marketOptionsFromDB, setMarketOptions] = useState([]);
  MarketOptions(setMarketOptions);

  const marketOptions = []
  if (marketOptionsFromDB.length === 0) {
    marketOptions.push({value: 'pierwotny', label: 'pierwotny'})
  } else {
    for (let i = 0; i < marketOptionsFromDB.length; i++) {
      marketOptions.push({ value: marketOptionsFromDB[i].market_type, label: marketOptionsFromDB[i].market_type });
    }
  }

  const dataTypes = [
    {value: 'Current data', label: 'Current data'}, 
    {value: 'Historical data', label: 'Historical data'}
  ];
  
  const [selectedCity, setSelectedCity] = useState([cityOptions[0]]);
  const [selectedMarket, setSelectedMarket] = useState([marketOptions[0]]);
  const [selectedDataType, setSelectedDataType] = useState([dataTypes[0]]);


  const [chartDataSet, setChartDataSet] = useState([]);
  const [datasetLabels, setDatasetLabels] = useState([]);
  FetchMultipleData(selectedCity, selectedMarket, selectedDataType, setChartDataSet, setDatasetLabels);


  const handleChangeCity = (selected) => {
    setSelectedCity(selected || []);
  };

  const handleChangeMarket = (selected) => {
    setSelectedMarket(selected || []);
  };

  const handleChangeDataType = (selected) => {
    setSelectedDataType(selected || []);
  }


  console.log("data: ", chartDataSet);


  const datasetList = [];
  var xAxisLabels = [];
  const datasetColors = ["black", "orange", "grey", 'rgba(75, 192, 192, 1)'];

  if (selectedDataType.value === "Current data" ) {
    for (let i = 0; i < chartDataSet.length; i++) {

      if (i === 0) {
        xAxisLabels = chartDataSet[i].map((price) => price.date);
      }
      datasetList.push({
        label: datasetLabels[i] + " [PLN/m2]",
        data: chartDataSet[i].map((price) => price.m2_price),
        borderColor: datasetColors[i],
        borderWidth: 2
      });
    }
  } else if (selectedDataType.value === "Historical data") {

      xAxisLabels = chartDataSet.map((price) => price.date);

      datasetList.push({
        label: datasetLabels[0] + " [PLN/m2]",
        data: chartDataSet.map((price) => price.m2_price),
        borderColor: datasetColors[0],
        borderWidth: 2
      });


  }
 
  

  var chartData = {
    labels: xAxisLabels,
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
        <SelectMenus cityOptions={cityOptions} marketOptions={marketOptions} dataTypesOptions={dataTypes}
                      handleChangeCity={handleChangeCity} handleChangeMarket={handleChangeMarket} handleChangeDataType={handleChangeDataType}/>
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
