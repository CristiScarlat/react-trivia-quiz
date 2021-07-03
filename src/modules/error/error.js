import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './error.css'

function ErrorDisplay({errorMsg, className}) {
    return (
        <div className={`d-flex flex-column align-items-center error-container ${className}`}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="6x" color="red" />
            <p className="m-2">{errorMsg}</p>
        </div>
    )
}

export default ErrorDisplay;