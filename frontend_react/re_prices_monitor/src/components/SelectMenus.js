import React from 'react'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async';


function SelectMenus({ cityOptions, marketOptions,
                          handleChangeCity, handleChangeMarket }) {
    return (
      <div className='Select-Menus-Box'>
        <div className='Single-Select-Box'>
          <h4>Select city</h4>
          <Select
              options={cityOptions} 
              isMulti
              defaultValue= {cityOptions[0]}
              onChange={handleChangeCity}
          />
        </div>
        
        <div className='Single-Select-Box'>
          <h4>Select market</h4>
          <Select 
              options={marketOptions} 
              isMulti
              defaultValue= {marketOptions[0]}
              onChange={handleChangeMarket}
          />
        </div>
      </div>
    );
  }
export default SelectMenus;