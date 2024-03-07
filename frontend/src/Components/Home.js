import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import a1 from '../images/a1.jpg';
import a2 from '../images/cardio.jpg';
import a3 from '../images/strength.jpg';
import a4 from '../images/yoga.jpg';
import a5 from '../images/zumba.jpg';
import configData from '../config.json';

function Home() {
    const [membershipPlans,setmembershipPlans] = useState({});
    const API = configData.API;
    

    async function getMembership(event) {
        try {
            const response = await axios.get(API +'membershipPlan');
            setmembershipPlans(response.data);
            console.log(membershipPlans);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    useEffect(() => {
        getMembership();
      }, []);

    return (
        <div >
            <div className='row center'>
                <h1>
                    Voice assistance
                </h1>
            </div>
            <div className='row'>
                <div className='col-9 offset-1'>
                <p>
                    Are you in danger? 
                </p>
                </div>
               
            </div>
            <div className='row center'>
                <h1></h1>
            </div>
        </div>

    )
}

export default Home;