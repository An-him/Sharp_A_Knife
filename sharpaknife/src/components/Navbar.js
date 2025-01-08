import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/signup">Sign Up</Link></li> {/* Link to the Signup Page */}
        <li><Link to="/login">Login</Link></li> {/* Link to the Login Page */}
      </ul>
    </nav>
  );
};

export default Navbar;
