import React from 'react'

import SalesComponent from './SalesComponent'
import PieChartForSubscriptions from './PieChartForSubscriptions'


function SalesReport() {
  return (
    <div className="sales-container">
    
      <h1>Sales Dashboard</h1>
      <br/>

      <div className="User Sales">
        <SalesComponent/>
      </div>

       <br/>
       <div className="PieChart-For-Subscriptions">

        <h2>PieChart For Subscriptions</h2>
     
      <PieChartForSubscriptions/>
      </div>


    </div>
  )
}

export default SalesReport
