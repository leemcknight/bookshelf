import { Button, Form, Modal } from "react-bootstrap";
const api = require('../util/apiManager');

function AddBookModal(props) {
    const [busy, setBusy] = useState(false);

    const handleAddBook = (event) => {
        event.stopPropagation();

        const book = {
            title: '',
            author: '',
            isbn: ''
        }
        setBusy(true);
        props.addBookCallbakc(book);

        setBusy(false)
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Add a book to your library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" placeholder="Book Title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="author">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="isbn">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="primary" type="cancel">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBookModal