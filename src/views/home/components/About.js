import React from 'react';
import './About.css';
import badgeEnviro from './images/badge-enviro.png'
import badgeEquity from './images/badge-equity.png'
import badgeGrowth from './images/badge-growth.png'
import badgeSocialImpact from './images/badge-social-impact.png'

export default function About() {
    return (
        <div className='about'>
            <div class='about-text'>
                <h2>
                    Our Values
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
                    <br/> <br/>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
                </p>
            </div>
            <div class='about-icons'>
                <img src={badgeEnviro} alt="environmentally responsible badge"/>
                <img src={badgeEquity} alt="social impact badge"/>
                <img src={badgeGrowth} alt="diversity equity and inclusion badge"/>
                <img src={badgeSocialImpact} alt="growth and mentorship badge"/>
            </div>
        </div>
    )
}