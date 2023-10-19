import React from 'react';
import './Team.css';
// import member from './images/member.png'

export default function Team({teamMember}) {
    return (
        <div className='team'>
            <div class='member'>
                <img src={teamMember.image}/>
                <h3>{teamMember.name}</h3>
                <p>{teamMember.role}</p>
            </div>
        </div>
    )
}