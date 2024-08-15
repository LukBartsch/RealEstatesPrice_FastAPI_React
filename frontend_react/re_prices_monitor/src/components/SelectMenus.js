import React from 'react'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async';


function SelectMenus({ city_options, market_options, 
                        selectedValueCity, selectedValueMarket, 
                          handleChangeCity, handleChangeMarket }) {
    return (
      <div className='Select-Menus-Box'>
        <div className='Single-Select-Box'>
          <h4>Select city</h4>
          <Select
              value={selectedValueCity} 
              options={city_options} 
              //isMulti
              //defaultValue= {selectedValue}
              onChange={e => handleChangeCity(e)}
          />
        </div>
        
        <div className='Single-Select-Box'>
          <h4>Select market</h4>
          <Select 
              //value={selectedValueMarket}
              options={market_options} 
              isMulti
              defaultValue= {market_options[0]}
              onChange={handleChangeMarket}
          />
        </div>
      </div>
    );
  }
export default SelectMenus;