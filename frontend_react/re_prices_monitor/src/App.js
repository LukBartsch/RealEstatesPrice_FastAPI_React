import logo from './logo.svg';
import './App.css';

import React from 'react';
//import api from './api.js';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import LineChart from "./components/LineChart";

import { useEffect, useState } from "react";


Chart.register(CategoryScale);



function App() {

  const [chartDataSet, setChartDataSet] = useState([]);


  useEffect(() => {

    fetch("http://localhost:8000/prices/Wrocław/wtorny")
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

  }, []);






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


  var chartData = {
    // ...chart data

    labels: chartDataSet.map((price) => price.date),
    datasets: [
      {
        label: "PLN/m2",
        data: chartDataSet.map((price) => price.m2_price),
        borderColor: "black",
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
        <LineChart chartData={chartData} />
      </div>

      <div className='Single-Box-Div'>
        <h3>Average prices from last scraping</h3>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Data</th>
              <th>City</th>
              <th>Type</th>
              <th>Market</th>
              <th>Price m2</th>               
              <th>Total price</th>
              <th>Rooms</th>
              <th>Area</th>
              <th>Samples</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={price.id}>
                <td>{index + 1}</td>
                <td>{price.date}</td>
                <td>{price.city_name}</td>
                <td>{price.real_estate_type}</td>
                <td>{price.market_type}</td>
                <td>{price.m2_price}</td>
                <td>{price.total_price}</td>
                <td>{price.rooms}</td>
                <td>{price.area}</td>
                <td>{price.samples}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
