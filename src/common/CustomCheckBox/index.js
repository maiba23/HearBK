import React from 'react';
import './checkbox.style.scss';

const CustomCheckbox = ({ selected, onClick }) => {
    return (
        <div className="check-box-outer" onClick={onClick}>
            {selected && <div className="check-box-inner" />}
        </div>
    )
}

export default CustomCheckbox;
