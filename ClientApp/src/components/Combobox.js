import React, { useState } from 'react';

export default function Combobox({ selectedOption, availableOptions, onOptionSelect }) {

    return (
        <select value={selectedOption.value} onChange={onOptionSelect}>
            {
                availableOptions.map(opt =>
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                )
            }
        </select>
    );

}