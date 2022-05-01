import React from 'react';
import propTypes from 'prop-types';

const Spinner = ({type = "border", color = "light"}) => {
    return (
        <div className={`spinner-${type} spiner-${color} spinner-${type}-sm`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

Spinner.propTypes = {
    type: propTypes.oneOf(['border', 'grow']),
    color: propTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'])
}

export default Spinner;