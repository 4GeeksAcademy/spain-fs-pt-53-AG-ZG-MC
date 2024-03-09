import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/BackendURL";


import Home from "./pages/Home";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/ScrollToTop";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import EventsAll from "./pages/EventsAll";
import EventSearch from "./pages/EventSearch";
import EventView from "./pages/EventView";
import RegistrationAndRecovery from "./pages/RegistrationAndRecovery";
import UserProfile from "./pages/UserProfile";
import CreateEditEvent from "./component/CreateEditEvent";
import EventActions from "./component/EventActions";
import EventCard from "./component/EventCard";
import EventDetails from "./component/EventDetails";
import EventFilterOptions from "./component/EventFilterOptions";
import MyEvents from "./component/MyEvents";

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
                    <Routes>
                        {/* Pages */}
                        <Route path="/" exact element={<Home />} />
                        <Route path="/events" exact element={<EventsAll />} />
                        <Route path="/search" exact element={<EventSearch />} />
                        <Route path="/event/view/:eventId" exact element={<EventView />} />
                        <Route path="/register" exact element={<RegistrationAndRecovery />} />
                        <Route path="/profile" exact element={<UserProfile />} />

                        {/* Testing elements */}
                        <Route path="/create-edit-event" exact element={<CreateEditEvent />} />
                        <Route path="/event-actions" exact element={<EventActions />} />
                        <Route path="/event-card" exact element={<EventCard />} />
                        <Route path="/event-details" exact element={<EventDetails />} />
                        <Route path="/event-filter-options" exact element={<EventFilterOptions />} />
                        <Route path="/my-events" exact element={<MyEvents />} />
                        {/* Other routes go here */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
