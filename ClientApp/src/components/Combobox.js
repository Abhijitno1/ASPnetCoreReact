import React, { useState } from 'react';

export default function Combobox({ estyle, title, selectedOption, availableOptions, onOptionSelect }) {

    return (
        <select style={estyle} title={title} value={selectedOption && selectedOption.value} onChange={onOptionSelect}>
            {
                availableOptions.map(opt =>
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                )
            }
        </select>
    );

}