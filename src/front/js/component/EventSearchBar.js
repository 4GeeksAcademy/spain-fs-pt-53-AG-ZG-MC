import React, { useState } from 'react';


const EventSearchBar = ({ events, setFilteredEvents, onFilterClick  }) => {
    const [showFilters, setShowFilters] = useState(false);
    const initialFilters = {
        event_type: "",
        date_filter: "",
        start_date: "",
        end_date: "",
        duration_filter: "",
        age_range_filter_min: "",
        age_range_filter_max: "",
        people_range_filter_min: "",
        people_range_filter_max: "",
        gender_filter: "",
        language_filter: "",
        price_type_filter: "",
        lgtbi: "",
        kid_friendly: "",
        pet_friendly: ""
    };
    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (filterName, value) => {
        const updatedFilters = {
            ...filters,
            [filterName]: value
        };
        setFilters(updatedFilters);
    };

    const handleApplyFilters = () => {
        console.log("Applying filters...");
        if (!events || !Array.isArray(events.events)) {
            console.error("Events is not in the expected format.");
            return;
        }
        let filteredEvents = [...events.events]; 

        // Apply Date Filter
        if (filters.date_filter === 'custom') {
            const { start_date, end_date } = filters;
            let customFilteredEvents = filteredEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= new Date(start_date) && eventDate <= new Date(end_date);
            });
            filteredEvents = customFilteredEvents; 
        } else {
            const today = new Date();
            let endOfWeek = new Date(today);
            endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

            switch (filters.date_filter) {
                case 'today':
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.toDateString() === today.toDateString();
                    });
                    break;
                case 'tomorrow':
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.toDateString() === tomorrow.toDateString();
                    });
                    break;
                case 'this_week':
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        const today = new Date();
                        const endOfWeek = new Date(today);
                        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

                        return (eventDate >= today && eventDate <= endOfWeek) || eventDate.toDateString() === today.toDateString();
                    });
                    break;
                case 'next_week':
                    const nextWeekStart = new Date(today);
                    nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
                    const nextWeekEnd = new Date(nextWeekStart);
                    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
                    });
                    break;
                case 'this_weekend':
                    const startOfThisWeekend = new Date(today);
                    const endOfThisWeekend = new Date(today);
                    startOfThisWeekend.setDate(today.getDate() + (5 - today.getDay()));
                    endOfThisWeekend.setDate(startOfThisWeekend.getDate() + (6 - today.getDay()));
                    filteredEvents = filteredEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate >= startOfThisWeekend && eventDate <= endOfThisWeekend;
                    });
                    break;
                default:
                    break;
            }
        }

        // Apply duration Filter
        if (filters.duration_filter) {
            const durationFilters = filters.duration_filter.split(",");
            filteredEvents = filteredEvents.filter(event => {
                let passesDurationFilter = false;
                durationFilters.forEach(filter => {
                    switch (filter) {
                        case "short":
                            if (event.duration <= 60) {
                                passesDurationFilter = true;
                            }
                            break;
                        case "medium":
                            if (event.duration > 60 && event.duration <= 120) {
                                passesDurationFilter = true;
                            }
                            break;
                        case "long":
                            if (event.duration > 120) {
                                passesDurationFilter = true;
                            }
                            break;
                        default:
                            break;
                    }
                });
                return passesDurationFilter;
            });
        }

        // Apply Age Range Filter
        filteredEvents = filteredEvents.filter(event => {
            if (
                (filters.age_range_filter_min && parseInt(filters.age_range_filter_min) > event.max_age) ||
                (filters.age_range_filter_max && parseInt(filters.age_range_filter_max) < event.min_age)
            ) {
                return false;
            }
            return true;
        });

        // Apply People Range Filter
        filteredEvents = filteredEvents.filter(event => {
            if (
                (filters.people_range_filter_min && parseInt(filters.people_range_filter_min) > event.max_people) ||
                (filters.people_range_filter_max && parseInt(filters.people_range_filter_max) < event.min_people)
            ) {
                return false;
            }
            return true;
        });
        
        // Apply Type Filter
        if (filters.event_type) {
            filteredEvents = filteredEvents.filter(event => event.type === filters.event_type);
        }

        // Apply Gender Filter
        if (filters.gender_filter) {
            filteredEvents = filteredEvents.filter(event => event.gender === filters.gender_filter);
        }

        // Apply Language Filter
        if (filters.language_filter) {
            filteredEvents = filteredEvents.filter(event => filters.language_filter.includes(event.language));
        }

        // Apply Price Type Filter
        if (filters.price_type_filter) {
            filteredEvents = filteredEvents.filter(event => event.price_type === filters.price_type_filter);
        }

        // Apply LGTBI Friendly Filter
        if (filters.lgtbi !== "") {
            filteredEvents = filteredEvents.filter(event => event.lgtbi.toString() === filters.lgtbi);
        }

        // Apply Kid Friendly Filter
        if (filters.kid_friendly !== "") {
            filteredEvents = filteredEvents.filter(event => event.kid_friendly.toString() === filters.kid_friendly);
        }

        // Apply Pet Friendly Filter
        if (filters.pet_friendly !== "") {
            filteredEvents = filteredEvents.filter(event => event.pet_friendly.toString() === filters.pet_friendly);
        }

        setFilteredEvents(filteredEvents);
    };

    const handleClearFilters = () => {
        setFilters(initialFilters);
        // Llama a la función onFilterClick con los filtros iniciales para limpiar los filtros en el componente padre
        onFilterClick(initialFilters);
    
        // Deseleccionar todas las opciones de los select
        const selectElements = document.querySelectorAll("select");
        selectElements.forEach(select => {
            select.value = "";
        });
    
        // Actualiza los eventos filtrados con todos los eventos disponibles
        setFilteredEvents(events.events);
    };
    

    return (
        <div>
            {/* Filter Button */}
            <div>
                <button onClick={() => setShowFilters(!showFilters)}>Show Filters</button>
            </div>

            {/* Filter button filters */}
            {showFilters && (
                <div>
                    {/* Type filter */}
                    <label htmlFor="event_type">Type Filter:</label>
                    <select id="event_type" onChange={(e) => handleFilterChange("event_type", e.target.value)}>
                        <option value="">Select Type Filter</option>
                        <option value="nature">Nature</option>
                        <option value="party">Party</option>
                        <option value="culture">Culture</option>
                        <option value="relax">Relax</option>
                        <option value="family">Family</option>
                        <option value="sport">Sport</option>
                    </select>
                    {/* Date Filter */}
                    <label htmlFor="date_filter">Date Filter:</label>
                    <select id="date_filter" onChange={(e) => handleFilterChange("date_filter", e.target.value)}>
                        <option value="">Select Date Filter</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="this_week">This Week</option>
                        <option value="next_week">Next Week</option>
                        <option value="this_weekend">This Weekend</option>
                        <option value="custom">Custom</option>
                    </select>
                    {filters.date_filter === 'custom' && (
                        <>
                            <label htmlFor="start_date">Start Date:</label>
                            <input
                                type="date"
                                id="start_date"
                                value={filters.start_date}
                                onChange={(e) => handleFilterChange("start_date", e.target.value)}
                            />
                            <label htmlFor="end_date">End Date:</label>
                            <input
                                type="date"
                                id="end_date"
                                value={filters.end_date}
                                onChange={(e) => handleFilterChange("end_date", e.target.value)}
                            />
                        </>
                    )}

                    {/* Duration Filter */}
                    <label htmlFor="duration_filter">Duration Filter:</label>
                    <select
                        id="duration_filter"
                        onChange={(e) => handleFilterChange("duration_filter", e.target.value)}
                    >
                        <option value="">All Durations</option>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select>

                    {/* Age Range Filter */}
                    <label htmlFor="age_range_filter">Age Range:</label>
                    <input
                        type="number"
                        id="age_range_filter_min"
                        placeholder="Min Age"
                        onChange={(e) => handleFilterChange("age_range_filter_min", e.target.value)}
                    />
                    <input
                        type="number"
                        id="age_range_filter_max"
                        placeholder="Max Age"
                        onChange={(e) => handleFilterChange("age_range_filter_max", e.target.value)}
                    />

                    {/* People Range Filter */}
                    <label htmlFor="people_range_filter">People Range:</label>
                    <input
                        type="number"
                        id="people_range_filter_min"
                        placeholder="Min People"
                        onChange={(e) => handleFilterChange("people_range_filter_min", e.target.value)}
                    />
                    <input
                        type="number"
                        id="people_range_filter_max"
                        placeholder="Max People"
                        onChange={(e) => handleFilterChange("people_range_filter_max", e.target.value)}
                    />

                    {/* Gender Filter */}
                    <label htmlFor="gender_filter">Gender:</label>
                    <select
                        id="gender_filter"
                        onChange={(e) => handleFilterChange("gender_filter", e.target.value)}
                    >
                        <option value="">No preferences</option>
                        <option value="female_only">Female Only</option>
                        <option value="queer_only">Queer Only</option>
                        <option value="all_genders">All Genders</option>
                    </select>

                    {/* Language Filter */}
                    <label htmlFor="language_filter">Language:</label>
                    <select
                        id="language_filter"
                        onChange={(e) => handleFilterChange("language_filter", e.target.value)}
                    >
                        <option value="">All Languages</option>
                        <option value="spanish">Spanish</option>
                        <option value="catalan">Catalan</option>
                        <option value="english">English</option>
                        <option value="german">German</option>
                        <option value="french">French</option>
                    </select>

                    {/* Price Type Filter */}
                    <label htmlFor="price_type_filter">Price Type:</label>
                    <select
                        id="price_type_filter"
                        onChange={(e) => handleFilterChange("price_type_filter", e.target.value)}
                    >
                        <option value="">All Price Types</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>

                    {/* LGTBI Friendly Filter */}
                    <label htmlFor="lgtbi">LGTBI Friendly:</label>
                    <select
                        id="lgtbi"
                        onChange={(e) => handleFilterChange("lgtbi", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {/* Kid Friendly Filter */}
                    <label htmlFor="kid_friendly">Kid Friendly:</label>
                    <select
                        id="kid_friendly"
                        onChange={(e) => handleFilterChange("kid_friendly", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {/* Pet Friendly Filter */}
                    <label htmlFor="pet_friendly">Pet Friendly:</label>
                    <select
                        id="pet_friendly"
                        onChange={(e) => handleFilterChange("pet_friendly", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {/* Apply Filters Button */}
                    <button onClick={() => {
                        console.log("Button clicked!"); // Add this console.log statement
                        handleApplyFilters();
                    }}>Apply Filter</button>
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            )}
        </div>
    );
};

export default EventSearchBar;