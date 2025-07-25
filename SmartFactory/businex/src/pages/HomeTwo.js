import React, {Fragment} from 'react';

import Header from '../components/Header'
import Slider from '../components/Slider/ai-accelerator'
import About from '../components/About/ai-accelerator'
import Services from '../components/Services'
import Features from '../components/Features'
import Testimonial from "../components/Testimonials/ai-accelerator";
import Team from "../components/Team/ai-accelerator";
import Blog from "../components/Blog";
import BrandLogo from "../components/BrandLogo";
import Funfact from "../components/Funfact";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";
import MobileMenu from "../components/MobileMenu";

const AIAccelerator = () => {
    return (
        <Fragment>
            <Header/>
            <Slider/>
            <About/>
            <Services/>
            <Features classes="sp-top"/>
            <Testimonial/>
            <Team/>
            <Blog/>
            <BrandLogo/>
            <Funfact/>
            <CallToAction/>
            <Footer/>
            <LoginRegister/>
            <MobileMenu/>
        </Fragment>
    );
};

export default AIAccelerator;