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
  
  const [selectedValue, handleChange] = useState(city_options[0]);

  //console.log("Selected value: ", selectedValue);



  const [chartDataSet, setChartDataSet] = useState([]);
  const [chartDataSet_2, setChartDataSet_2] = useState([]);





  useEffect(() => {

    fetch("http://localhost:8000/prices/" + selectedValue.value + "/pierwotny")
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

    fetch("http://localhost:8000/prices/" + selectedValue.value + "/wtorny")
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


  // Or combine them into one state variable
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/prices/Wrocław/pierwotny'),
      fetch('http://localhost:8000/prices/Wrocław/wtorny'),
    ])
      .then(([resUsers, resPosts]) => 
        Promise.all([resUsers.json(), resPosts.json()])
      )
      .then((data) => {

        setCombinedData(data);
      });
  }, []);

  console.log("Combined data: ", combinedData);






  
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





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome in Real Estate Prices Monitor Application</h3>
      </header>

      {/* <div>Add your components...</div> */}

      <div className='Single-Box-Div'>
        <SelectMenus city_options={city_options} market_options={market_options} selectedValue={selectedValue} handleChange={handleChange}/>
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
