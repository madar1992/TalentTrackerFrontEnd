import React from 'react';
import '../css/EmployerHome.css';
import '../css/Dashboard.css';
import Residebar from './Residebar';



const EmployerHome = () => {
  return (
    <div class="employer-home">
    <Residebar />
       <div class="container">
    <h2> Organization Overview</h2>

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container">
    <div class="row">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h2 class="m-b-20">Interview Jobs</h2>
                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>5</span></h2>
                   {/* <!-- <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>--> */}
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h2 class="m-b-20">Job Applicants</h2>
                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>205</span></h2>
                </div>
            </div>
        </div>
     </div>
 </div>
 </div>
 </div>
  );
};

export default EmployerHome;
