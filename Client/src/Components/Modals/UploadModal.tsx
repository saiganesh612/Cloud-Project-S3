import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"

const UploadModal: React.FC = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button onClick={handleShow} id="upload">Upload</Button>

            <Modal show={show} onHide={handleClose} keyboard={false} backdrop="static">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Images or Videos</Form.Label>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="file" accept="video/*, image/*" />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" onClick={handleClose} variant="secondary">Close</Button>
                    <Button size="sm" onClick={handleClose} variant="success">Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UploadModal
