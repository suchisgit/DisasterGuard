import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import configData from '../config.json';

function Enrollusers() {

    const [selectedMember, setselectedMember] = useState('Select a member');
    const [selectedDuration, setselectedDuration] = useState('Select a duration');
    const [members, setMembers] = useState([]);

    const { guserRole, setguserRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const API = configData.API;

    async function getMembers() {
        try {
            const response = await axios.get(API +'getnonmembers');
            console.log(response.data);
            setMembers(response.data);
            console.log(members);
        }
        catch {
            console.error('get members failed');
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    useEffect(() => {
        if (guserRole == '') {
            navigate('/');
        }
        else if (guserRole == 'member') {
            navigate('/member');
        }
        else if (guserRole == 'Non Member') {
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function enrollMembers(event) {
        try {
            var details = { userId: selectedMember, months: selectedDuration }
            if(selectedMember=='Select a member' && selectedDuration=="Select a duration"){
                alert ("Please select member and duration");
                return;
            }
            else if (selectedMember=='Select a member'){
                alert ("Please select a member");
                return;
            }
            else if (selectedDuration=="Select a duration"){
                alert ("Please select duration");
                return;
            }
            const response = await axios.patch(API + 'user/updateUserMembership', details);
            getMembers();
            setselectedMember('Select a member');
            setselectedDuration('Select a duration');

        }
        catch (error) {
            console.error('Enrollment unsuccessful', error.response.data);
        }
    }

    const setMember = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedMember(target.innerText);
        }
    }
    const setDuration = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedDuration(target.innerText);
        }
    }

    return (
        <div>
            <div className='row center'>
                <h1>
                    Select member and duration to enroll a new member
                </h1>
            </div>
            <div className='row'>
                <div className='enroll'>
                    <div className='center side'>
                        <h3> Member</h3>
                        <div class="dropdown" onClick={setMember}>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" required>
                                {selectedMember}
                            </button>
                            <ul class="dropdown-menu">
                                {
                                    members.map(member => (
                                        <li><a class="dropdown-item" >{member.userId}</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className='center side'>
                        <h3>Duration</h3>
                        <div class="dropdown" onClick={setDuration}>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" required>
                                {selectedDuration}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" >3 </a></li>
                                <li><a class="dropdown-item" >6</a></li>
                                <li><a class="dropdown-item" >12</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <button type="button" class="btn btn-success" onClick={enrollMembers}>Enroll</button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Enrollusers;