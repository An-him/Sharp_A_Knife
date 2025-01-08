import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for React 18
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div className="home container">
            <h1 className='Heading'>Welcome to SharpAKnife</h1>
            <Link to="/order" className="btn btn-primary btn  ">Order Now</Link>
        </div>
    )
}
export default HomePage;