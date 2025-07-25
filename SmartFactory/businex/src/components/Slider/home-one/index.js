import React from 'react';
import SlickSlider from '../../UI/Slick'
import SliderData from '../../../data/Slider/home-1'
import {Link} from "react-router-dom";


const NextArrow = ({className, onClick}) => {
    return (
        <button className={className} onClick={onClick}><i className="fa fa-angle-right"/></button>
    )
};

const PrevArrow = ({className, onClick}) => {
    return (
        <button className={className} onClick={onClick}><i className="fa fa-angle-left"/></button>
    )
};

const Slider = () => {
        const settings = {
            arrows: true,
            dots: false,
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        };

        return (
            <div className={'slider-area'}>
                <SlickSlider settings={settings}>
                    {
                        SliderData.map(item => (
                            <div key={item.id}>
                                <div className="slider-item"
                                     style={{backgroundImage: `url(${require('../../../assets/img/' + item.bg)})`}}>
                                    {/* Video Background */}
                                    <video 
                                        className="slider-video-bg"
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            zIndex: 1
                                        }}
                                    >
                                        <source src="/videos/Smart Factory - keep moving forward.mov" type="video/quicktime" />
                                        <source src="/videos/Smart Factory - keep moving forward.mov" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    
                                    {/* Dark overlay for better text readability */}
                                    <div className="slider-overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)',
                                        zIndex: 1
                                    }}></div>
                                    
                                    {/* Content overlay */}
                                    <div className="container" style={{position: 'relative', zIndex: 3}}>
                                        <div className="row">
                                            <div className="col-xl-7">
                                                <div className="slider-content">
                                                    <h2>{item.title}</h2>
                                                    <p>{item.text}</p>
                                                    <Link to={`${process.env.PUBLIC_URL + item.btnLink}`} className="btn btn-brand">{item.btnText}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </SlickSlider>
            </div>
        );
    }
;

export default Slider;