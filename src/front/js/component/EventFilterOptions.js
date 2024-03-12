import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const EventFilterOptions = () => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage filter options
  const [filterOptions, setFilterOptions] = useState({
    event_type: [],
    date_filter: "",
    start_date: "",
    end_date: "",
    duration_filter: "",
    age_range_filter_min: null,
    age_range_filter_max: null,
    people_range_filter_min: null,
    people_range_filter_max: null,
    gender_filter: [],
    language_filter: [],
    price_type_filter: [],
    lgtbi: "",
    kid_friendly: "",
    pet_friendly: "",
    // Add more filters based on models.py criteria
  });

  // UseEffect to update filter options when events change
  useEffect(() => {
    // Implement logic to extract unique filter options from events
    // and update the filterOptions state
    const uniqueEventTypes = [...new Set(events.map((event) => event.type))];
    const uniqueDates = [...new Set(events.map((event) => event.date))];
    const uniqueDurations = [...new Set(events.map((event) => event.duration))];
    const uniqueGenders = [...new Set(events.map((event) => event.gender))];
    const uniqueLanguages = [...new Set(events.map((event) => event.language))];
    const uniquePriceTypes = [...new Set(events.map((event) => event.price_type))];

    setFilterOptions({
      ...filterOptions,
      event_type: uniqueEventTypes,
      date_filter: "", // Set default value based on  requirements
      start_date: "", // Set default value based on  requirements
      end_date: "", // Set default value based on  requirements
      duration_filter: "", // Set default value based on  requirements
      age_range_filter_min: null, // Set default value based on  requirements
      age_range_filter_max: null, // Set default value based on  requirements
      people_range_filter_min: null, // Set default value based on  requirements
      people_range_filter_max: null, // Set default value based on  requirements
      gender_filter: uniqueGenders,
      language_filter: uniqueLanguages,
      price_type_filter: uniquePriceTypes,
      lgtbi: "", // Set default value based on  requirements
      kid_friendly: "", // Set default value based on  requirements
      pet_friendly: "", // Set default value based on  requirements
      // Add more filters based on your models.py criteria
    });
  }, [events]);

  // JSX component - ATLAS
  return (
    <div>
      <h3>Filter Options</h3>

      Event Type Filter
      <label htmlFor="event_type">Event Type:</label>
      <select
        id="event_type"
        value={filterOptions.event_type}
        onChange={(e) => setFilterOptions({ ...filterOptions, event_type: e.target.value })}
      >
        <option value="">All Event Types</option>
        {filterOptions.event_type.map((eventType) => (
          <option key={eventType} value={eventType}>
            {eventType}
          </option>
        ))}
      </select>

      {/* Date Filter */}
      <label htmlFor="date_filter">Date Filter:</label>
      <select
        id="date_filter"
        value={filterOptions.date_filter}
        onChange={(e) => setFilterOptions({ ...filterOptions, date_filter: e.target.value })}
      >
        {/* Add date filter options based on requirements */}
        {/* Example: Today, Tomorrow, This Week, Next Week, Custom */}
      </select>

      {/* Start Date and End Date (for Custom Date Range) */}
      {filterOptions.date_filter === "custom" && (
        <>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            value={filterOptions.start_date}
            onChange={(e) => setFilterOptions({ ...filterOptions, start_date: e.target.value })}
          />

          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            value={filterOptions.end_date}
            onChange={(e) => setFilterOptions({ ...filterOptions, end_date: e.target.value })}
          />
        </>
      )}


      {/* Duration Filter */}
      <label htmlFor="duration_filter">Duration Filter:</label>
      <select
        id="duration_filter"
        value={filterOptions.duration_filter}
        onChange={(e) => setFilterOptions({ ...filterOptions, duration_filter: e.target.value })}
      >
        {/* Add duration filter options based on requirements */}
        {/* Short, Medium, Long, etc */}
      </select>

      {/* Age Range Filter */}
      <label htmlFor="age_range_filter_min">Age Range:</label>
      <input
        type="number"
        id="age_range_filter_min"
        placeholder="Min Age"
        value={filterOptions.age_range_filter_min}
        onChange={(e) => setFilterOptions({ ...filterOptions, age_range_filter_min: e.target.value })}
      />
      <input
        type="number"
        id="age_range_filter_max"
        placeholder="Max Age"
        value={filterOptions.age_range_filter_max}
        onChange={(e) => setFilterOptions({ ...filterOptions, age_range_filter_max: e.target.value })}
      />

      {/* People Range Filter */}
      <label htmlFor="people_range_filter_min">People Range:</label>
      <input
        type="number"
        id="people_range_filter_min"
        placeholder="Min People"
        value={filterOptions.people_range_filter_min}
        onChange={(e) => setFilterOptions({ ...filterOptions, people_range_filter_min: e.target.value })}
      />
      <input
        type="number"
        id="people_range_filter_max"
        placeholder="Max People"
        value={filterOptions.people_range_filter_max}
        onChange={(e) => setFilterOptions({ ...filterOptions, people_range_filter_max: e.target.value })}
      />

      {/* Gender Filter */}
      <label htmlFor="gender_filter">Gender:</label>
      <select
        id="gender_filter"
        multiple
        value={filterOptions.gender_filter}
        onChange={(e) => setFilterOptions({ ...filterOptions, gender_filter: Array.from(e.target.selectedOptions, (option) => option.value) })}
      >
        {/* Add gender filter options based on requirements */}
        {/* Example: Female Only, Queer Only, All Genders, No Preferences */}
      </select>

      {/* Language Filter */}
      <label htmlFor="language_filter">Language:</label>
      <select
        id="language_filter"
        multiple
        value={filterOptions.language_filter}
        onChange={(e) => setFilterOptions({ ...filterOptions, language_filter: Array.from(e.target.selectedOptions, (option) => option.value) })}
      >
        {/* Add language filter options based on requirements */}
        {/* Example: Spanish, Catalan, English, German, French */}
      </select>

      {/* Price Type Filter */}
      <label htmlFor="price_type_filter">Price Type:</label>
      <select
        id="price_type_filter"
        multiple
        value={filterOptions.price_type_filter}
        onChange={(e) => setFilterOptions({ ...filterOptions, price_type_filter: Array.from(e.target.selectedOptions, (option) => option.value) })}
      >
        {/* Add price type filter options based on requirements */}
        {/* Example: Free, Paid */}
      </select>

      {/* LGTBI Friendly Filter */}
      <label htmlFor="lgtbi">LGTBI Friendly:</label>
      <select
        id="lgtbi"
        value={filterOptions.lgtbi}
        onChange={(e) => setFilterOptions({ ...filterOptions, lgtbi: e.target.value })}
      >
        {/* Add LGTBI filter options based on your requirements */}
        {/* Example: True, False */}
      </select>

      {/* Kid Friendly Filter */}
      <label htmlFor="kid_friendly">Kid Friendly:</label>
      <select
        id="kid_friendly"
        value={filterOptions.kid_friendly}
        onChange={(e) => setFilterOptions({ ...filterOptions, kid_friendly: e.target.value })}
      >
        {/* Add Kid Friendly filter options based on requirements */}
        {/* Example: True, False */}
      </select>

      {/* Pet Friendly Filter */}
      <label htmlFor="pet_friendly">Pet Friendly:</label>
      <select
        id="pet_friendly"
        value={filterOptions.pet_friendly}
        onChange={(e) => setFilterOptions({ ...filterOptions, pet_friendly: e.target.value })}
      >
        {/* Add Pet Friendly filter options based on requirements */}
        {/* Example: True, False */}
      </select>

      {/* Add more filters based on models.py criteria */}

      {/* Apply Filter Button */}
      <button onClick={() => actions.fetchFilteredEvents(filterOptions)}>Apply Filter</button>
    </div>
  );
};

export default EventFilterOptions;
