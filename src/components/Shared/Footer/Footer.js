import React, { useEffect, useState } from 'react';
import './Footer.css'
import FooterCol from './FooterCol/FooterCol';


const Footer = () => {
    const [footer, setFooter] = useState([]);
    useEffect(() => {
        fetch('https://immense-retreat-81053.herokuapp.com/footer')
            .then(res => res.json())
        .then(data => setFooter(data))
    },[]);
    return (
        <footer className="footer">
            <div className="brand-info">
                <h1>S H U T T E R</h1>

            </div>
            <div className="link-div">
                {
                    footer.map(data=><FooterCol key={data._id} data={data} />)
                }
            </div>
            <p className="footer-end">Copyright @
            Jamil - {(new Date()).getFullYear()} All Rights Reserved</p>
        </footer>
    );
};

export default Footer;