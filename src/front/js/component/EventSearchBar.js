// EventSearchBar.js

import React from 'react';

const EventSearchBar = ({ options, onSelect }) => {
    const handleSelect = (e) => {
        const selectedOption = e.target.value;
        onSelect(selectedOption);
    };

    return (
        <div>
            <label htmlFor="search-select">Search events:</label>
            <select id="search-select" onChange={handleSelect}>
                <option value="">Select an option...</option>
                {options && options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default EventSearchBar;
