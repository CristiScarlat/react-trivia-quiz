import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function CustomModal({children, show, onHide, title="", showFooter=true, handleCancelButton, handleYesButton, cancelButtonLabel='no', yesButtonLabel='yes'}) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {showFooter && <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelButton}>
                    {cancelButtonLabel}
                </Button>
                <Button variant="primary" onClick={handleYesButton}>
                    {yesButtonLabel}
                </Button>
            </Modal.Footer>}
        </Modal>
    )
}

export default CustomModal