import { Button, Form, Modal } from "react-bootstrap";

function AddBookModal(props) {

    const handleAddBook = async e => {
        e.preventDefault();
        e.stopPropagation();

        const book = {
            title: e.target.title.value,
            author: e.target.author.value,
            isbn: e.target.isbn.value
        }

        await props.bookAddedCallback(book);
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
                        <Form.Control type="text" placeholder="Book Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Author Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="isbn">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onSubmit={handleAddBook}>
                        Add Book
                    </Button>
                    <Button variant="primary" type="cancel" >
                        Cancel
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBookModal