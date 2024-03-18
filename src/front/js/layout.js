import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/BackendURL";
import injectContext from './store/appContext';

import Header from './component/Header';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import HomeLoggedIn from './pages/HomeLogged'; // Añadir al enrutado
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
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Header />
                        <Navbar />
                        <Routes>
                            {/* Pages */}
                            <Route exact path="/" element={<HomeNotLogged />} />
                            <Route exact path="/home" element={<HomeNotLogged />} />
                            <Route exact path="/login" element={<LoginPasswordRecovery />} />
                            <Route exact path="/register" element={<RegistrationPage />} />
                            <Route exact path="/events" element={<EventsListAllPage />} />
                            <Route exact path="/events/:eventId" element={<EventDetailsPage />} />
                            <Route exact path="/create-event" element={<CreateEventPage />} />
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
