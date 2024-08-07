import React from 'react'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async';


function SelectMenus({ city_options, market_options, selectedValue, handleChange }) {
    return (
      <div className='Select-Menus-Box'>
        <div className='Single-Select-Box'>
          <h4>Select city</h4>
          <Select
              value={selectedValue} 
              options={city_options} 
              //isMulti
              //defaultValue= {selectedValue}
              onChange={e => handleChange(e)}
          />
        </div>
        
        <div className='Single-Select-Box'>
          <h4>Select market</h4>
          <Select 
              options={market_options} 
              isMulti
              defaultValue= {[market_options[0]]}
          />
        </div>
      </div>
    );
  }
export default SelectMenus;