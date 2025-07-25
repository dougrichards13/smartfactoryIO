import {Link} from "react-router-dom";
import React, {Component} from 'react';

class Logo extends Component {
    render() {
        return (
            <div className="logo-area">
                <Link to="/" className="logo">
                    <img src={require('../../assets/img/brand-logo/SM-Logo-Transparent.png')} alt="Smart Factory Logo"/>
                </Link>
            </div>
        );
    }
}

export default Logo;