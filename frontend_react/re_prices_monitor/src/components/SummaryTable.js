

function SummaryTable({ prices }) {
    return (
      <div>
        <h4>Average prices and informations from last scraping</h4>
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
    );
  }
  export default SummaryTable;