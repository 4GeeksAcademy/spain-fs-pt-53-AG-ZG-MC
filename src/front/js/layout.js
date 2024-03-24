import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/BackendURL";
import injectContext from './store/appContext';
import Header from './component/Header';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventsListAllPage from './pages/EventsListAllPage';
import RegistrationPage from './pages/RegistrationPage';
import UserProfileMine from './pages/UserProfileMine';
import Login from './component/Login';
import Logout from './component/Logout';
import PasswordResetPage from './pages/PasswordResetPage';

import NotFound from './component/NotFound';
import ScrollToTop from './component/ScrollToTop';

//create your first element
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Header />
                    <Routes>
                        {/* Pages */}
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} /> 
                        <Route exact path="/reset-password/:token" element={<PasswordResetPage />} />
                        <Route exact path="/register" element={<RegistrationPage />} /> 
                        <Route exact path="/events" element={<EventsListAllPage />} /> 
                        <Route exact path="/events/:eventId" element={<EventDetailsPage />} /> 
                        <Route exact path="/create-event" element={<CreateEventPage />} /> 
                        <Route exact path="/profile" element={<UserProfileMine />} />
                        <Route exact path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
