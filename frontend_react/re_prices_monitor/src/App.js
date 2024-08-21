import logo from './logo.svg';
import './App.css';

import React from 'react';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { LastPrices, CityOptions, MarketOptions, ChartXaxisLabels, FetchMultipleData } from './components/GetDataFunctions';

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
  
  const [selectedValue, setSelectedCity] = useState([cityOptions[0]]);
  const [selectedMarket, setSelectedMarket] = useState([marketOptions[0]]);


  const [chartXaxisLabels, setChartXaxisLabels] = useState([]);
  ChartXaxisLabels(setChartXaxisLabels);


  const [chartDataSet, setChartDataSet] = useState([]);
  const [datasetLabels, setDatasetLabels] = useState([]);
  FetchMultipleData(selectedValue, selectedMarket, setChartDataSet, setDatasetLabels);


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
      label: datasetLabels[i] + " [PLN/m2]",
      data: chartDataSet[i].map((price) => price.m2_price),
      borderColor: datasetColors[i],
      borderWidth: 2
    });
  }

  var chartData = {
    labels: chartXaxisLabels.map((price) => price.date),
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
        <SelectMenus cityOptions={cityOptions} marketOptions={marketOptions} 
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
