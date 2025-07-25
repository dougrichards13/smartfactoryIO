import React from 'react';
import Text from "../UI/Text";
import Widget from "../UI/Widget";
import List from "../UI/List";
import LI from "../UI/List/Item";
import {Link} from "react-router-dom";
import Logo from '../../assets/img/brand-logo/SM-Logo-Transparent.png'

function Footer() {
    return (
        <footer className="footer-area sp-bottom">
            <div className="container">
                <div className="row mtn-40">
                    <div className="col-lg-4 order-4 order-lg-0">
                        <div className="widget-item">
                            <div className="about-widget">
                                <Link to={`${process.env.PUBLIC_URL + "/"}`}>
                                    <img src={Logo} alt="Logo"/>
                                </Link>

                                <Text>
                                    Smart Factory transforms human potential into business reality. Since 2011, we have pioneered the fusion of human expertise with advanced methodologies, delivering transformative solutions for upper mid-size and enterprise clients.
                                </Text>

                                <Text classes="copyright-txt">
                                    &copy; {new Date().getFullYear()} Smart Factory Ltd. All Rights Reserved.
                                </Text>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-lg-2 ml-auto">
                        <Widget title="Information">
                            <List classes="widget-list">
                                <LI><Link to={`${process.env.PUBLIC_URL + "/team"}`}>Our team</Link></LI>
                                <LI><Link to={`${process.env.PUBLIC_URL + "/contact"}`}>Contact us</Link></LI>
                                <LI><Link to={`${process.env.PUBLIC_URL + "/news"}`}>Latest news</Link></LI>
                                <LI><Link to={`${process.env.PUBLIC_URL + "/ai-accelerator"}`}>AI Accelerator</Link></LI>
                            </List>
                        </Widget>
                    </div>

                    <div className="col-md-4 col-lg-2 ml-auto">
                        <Widget title="Social Links">
                            <List classes="widget-list">
                                <LI><Link to="https://linkedin.com/company/smartfactory" target={'_blank'}>LinkedIn</Link></LI>
                                <LI><Link to="https://twitter.com/smartfactory" target={'_blank'}>Twitter</Link></LI>
                                <LI><Link to="https://youtube.com/@smartfactory" target={'_blank'}>YouTube</Link></LI>
                                <LI><Link to="https://smartfactory.io" target={'_blank'}>Website</Link></LI>
                            </List>
                        </Widget>
                    </div>

                    <div className="col-md-4 col-lg-3">
                        <Widget title="Contact Us">
                            <address>
                                Kansas City, Missouri <br/>
                                info@smartfactory.io <br/>
                                https://smartfactory.io
                            </address>
                        </Widget>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;