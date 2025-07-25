import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/*
* @ All pages Import
*/
import HomeOne from './pages/HomeOne'
import AIAccelerator from './pages/HomeTwo'
import BlogListRightSidebar from './pages/BlogListRightSidebar';
import BlogDetailsPage from "./pages/BlogDetails";
import Team from "./pages/Team";
import TeamDetails from "./pages/TeamDetails";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import ScrollToTop from "./helpers/ScrollToTop";

const App = () => {
    return (
        <Router>
            <ScrollToTop>
                <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL + "/news"}`} component={BlogListRightSidebar}/>
                    <Route path={`${process.env.PUBLIC_URL + "/news/:blogID"}`} component={BlogDetailsPage}/>
                    <Route exact path={`${process.env.PUBLIC_URL + "/team"}`} component={Team}/>
                    <Route path={`${process.env.PUBLIC_URL + "/team-member/:teamID"}`} component={TeamDetails}/>
                    <Route exact path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/ai-accelerator'}`} component={AIAccelerator}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/company'}`} component={HomeOne}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/'}`} component={HomeOne}/>
                    <Route exact component={Error404}/>
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default App;