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
                    The Gold's gym
                </h1>
            </div>
            <div className='row'>
                <div className='col-9 offset-1'>
                <p>
                    Welcome to our gym! Our mission is to help you achieve your fitness goals in a supportive and motivating environment.
                    With state-of-the-art equipment, a variety of classes, and experienced personal trainers,
                    we have everything you need to take your fitness to the next level. Whether you're looking to lose weight,
                    build muscle, or simply improve your overall health and well-being, we're here to help you succeed. Join us
                    today and start your journey towards a healthier, happier you!
                </p>
                </div>
               
            </div>
            <div className='row center'>
                <h1>Avilable memberships</h1>
            </div>
            <div className='row memberships'>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img className='membership-card' src={img1} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">3 Month plan</h5>
                            <p class="card-text">
                            Kick-start your fitness journey with our new gym's 3-month basic plan, offering access to all facilities and equipment to help you get in shape and feel great.
                            </p>
                            <p class="card-text"><big>$90</big></p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img src={img2} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">6 Month plan</h5>
                            <p class="card-text">
                            Commit to your fitness journey with our discounted 6-month Basic Plan, offering access to all state-of-the-art gym equipment and facilities.
                            </p>
                            <p class="card-text"><big>$175</big></p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img src={img3} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">12 Month plan</h5>
                            <p class="card-text">
                            Commit to your fitness journey and receive personalized support from experienced trainers and nutritionists, plus access to state-of-the-art gym facilities.
                            </p>
                            <p class="card-text"><big>$250</big></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row center'>
                <h1>
                    Types of classes available
                </h1>
            </div>
            <div className='row memberships'>
                <div className='col-2'>
                    <div class="card actvity">
                        <img src={a1} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Boxing</h5>
                            <p class="card-text">Unleash your inner fighter and get a knockout workout with our boxing class!</p>
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <div class="card actvity">
                        <img src={a2} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Cardio</h5>
                            <p class="card-text">Join our cardio class to boost your heart health and improve your fitness level!</p>
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <div class="card actvity">
                        <img src={a3} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Strength </h5>
                            <p class="card-text">Sculpt muscles and build strength with our Strength training class!</p>
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <div class="card actvity">
                        <img src={a4} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Yoga</h5>
                            <p class="card-text">Find balance and improve flexibility with our rejuvenating yoga class!</p>
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <div class="card actvity">
                        <img src={a5} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Zumba</h5>
                            <p class="card-text">Get ready to dance your way to fitness and have fun with our lively Zumba class!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;