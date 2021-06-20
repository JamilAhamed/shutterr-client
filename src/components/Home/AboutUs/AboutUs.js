import React from 'react';
import './AboutUs.css'
import about from '../../../images/about.jpg';
const AboutUs = () => {
    return (
        <section id="about">
            <div className="section-header">
                <h1>About Us</h1>
            </div>
            <div className="about-container">
                <div className="title_bar">
                    <h1>We Are Awesome !</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, eos ipsam quo consectetur vitae omnis?</p>
                    <img className="about-img" src={about} alt="" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;