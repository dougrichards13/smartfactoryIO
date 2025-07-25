import React,{Fragment} from 'react';
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import About from "../components/About/ai-accelerator";
import Services from "../components/Services";
import BrandLogo from "../components/BrandLogo";
import Funfact from "../components/Funfact";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";
import MobileMenu from "../components/MobileMenu";
import Features from "../components/Features";
import Testimonial from "../components/Testimonials/ai-accelerator";
import Team from "../components/Team/ai-accelerator";

import ServiceThumb from '../assets/img/about.jpg'

const PageAbout = () => {
    return (
        <Fragment>
            <Header/>
            <PageHeader
                bgImg={require('../assets/img/page-header.jpg')}
                title="ABOUT US"
                content="Smart Factory always try to provide the best Business Solutions for Clients to grow up their Business very sharply and smoothly."
            />
            <About
                title={'Our Team'}
                heading="Meet Our <br/> Expert Member"
                thumb={ServiceThumb}
                content="<b>Smart Factory</b> always try to provide the best Business Solutions for Clinets to grow up their Business very sharply and smoothly. We voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
            />
            <Services/>
            <Features classes={'sm-top'}/>
            <Testimonial/>
            <Team/>
            <BrandLogo/>
            <Funfact classes="sp-top"/>
            <CallToAction/>
            <Footer/>
            <LoginRegister/>
            <MobileMenu/>
        </Fragment>
    );
};

export default PageAbout;