import logo from './logo.svg';
import './App.css';

import React from 'react';
import api from './api.js';

import { useEffect, useState } from "react";

function App() {


  const [prices, setPrices] = useState([]);

  const fetchPrices = async () => {
    const response = await api.get('/prices/Wrocław/pierwotny');
    setPrices(response.data);
  };

  useEffect(() => {
    fetchPrices();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome in Real Estate Prices Monitor Application</h3>
      </header>

      <div>Add your components...</div>
      <div>
        <h3>Prices</h3>
        <ul>
          {prices.map((price) => (
            <li key={price.id}>{price.city_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
