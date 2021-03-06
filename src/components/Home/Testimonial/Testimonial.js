import React, { useEffect, useState } from 'react';
import './Testimonial.css'
import TestimonialCard from './TestimonialCard/TestimonialCard';
const Testimonial = () => {
    const [reviewData, setReviewData] = useState([]);
    useEffect(() => {
        fetch('https://immense-retreat-81053.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviewData(data))

    }, [])
    return (
        <section id="testimonial" >
            <div className="section-header">
                <h1> Testimonials </h1>
                <h3>Join Our Happy Customers</h3>
            </div>
            <div className="std-card-container">
                {
                    reviewData.map(data => <TestimonialCard key={data._id} data={data} />)
                }
            </div>

        </section>
    );
};

export default Testimonial;