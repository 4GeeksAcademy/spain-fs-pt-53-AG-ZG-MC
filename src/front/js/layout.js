import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from './store/appContext';
import { BackendURL } from "./component/BackendURL";
import injectContext from './store/appContext';
import Header from './component/Header';
import NavbarLogged from './component/NavbarLogged';
import NavbarNotLogged from './component/NavbarNotLogged';
import Footer from './component/Footer';
import HomeLogged from './pages/HomeLogged';
import HomeNotLogged from './pages/HomeNotLogged';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventsListAllPage from './pages/EventsListAllPage';
import RegistrationPage from './pages/RegistrationPage';
import UserProfileMine from './pages/UserProfileMine';
import UserProfileOther from './pages/UserProfileOther';
import LoginPasswordRecovery from './component/LoginPasswordRecovery';
import Logout from './component/Logout';

import NotFound from './component/NotFound';
import ScrollToTop from './component/ScrollToTop';


//create your first element
const Layout = () => {
    const { store, actions } = useContext(Context);
    const isLoggedIn = store.session.isLoggedIn;

    console.log("isLoggedIn: ", isLoggedIn);

    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Header />
                        {isLoggedIn ? <NavbarLogged /> : <NavbarNotLogged />}
                        <Routes>
                            {/* Pages */}
                            <Route exact path="/" element={isLoggedIn ? <HomeLogged /> : <HomeNotLogged />} />
                            <Route exact path="/login" element={<LoginPasswordRecovery />} /> {/* DONE */}
                            <Route exact path="/register" element={<RegistrationPage />} /> {/* DONE */}
                            <Route exact path="/events" element={<EventsListAllPage />} /> {/* DONE */}
                            <Route exact path="/events/:eventId" element={<EventDetailsPage />} /> {/* DONE */}
                            <Route exact path="/create-event" element={<CreateEventPage />} /> {/* DONE */}
                            <Route exact path="/profile/mine" element={<UserProfileMine />} />
                            <Route exact path="/profile/:userId" element={<UserProfileOther />} />
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
