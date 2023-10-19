import React from 'react';
import './Header.css';
import bg from './images/ipp-landing-bg.png'

export default function Header() {
    return (
        <div className='header'>
            <div class="home-bkg-img">
                <img src={bg} alt="ipp logo"/>
            </div>
            <div class="home-ipp-text">
                <h1>Industry Partners <br/> Program</h1>
            </div>
            <div class="home-about-text">
                <p>
                    The Department of Computer Science at Brown University runs an industry partners program that offers corporations and non-profit organizations opportunities to collaborate with faculty, learn about Brown's research, and meet Brown students who are looking for employment. <br/>
                    <br/>
                    The Department seeks partners whose activities are aligned with Brown’s mission of education and research. Brown CS celebrates diversity and is committed to creating an inclusive environment for all our constituents. Membership in the IPP is by invitation. We welcome organizations whose business practices align with our expectation for equal opportunity and fair employment, as well as the responsible, transparent, and accessible use of technology.
                    </p>
            </div>
        </div>
    )
}