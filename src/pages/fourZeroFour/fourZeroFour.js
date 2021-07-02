import React from 'react';
import './fourZeroFour.css';
import ErrorDisplay from '../../modules/error/error';

function FourZeroFour() {
    return (
        <div className="four-zero-four-container mt-5">
            <ErrorDisplay errorMsg="404, Cannot find this page!"/>
        </div>
    )
}

export default FourZeroFour;