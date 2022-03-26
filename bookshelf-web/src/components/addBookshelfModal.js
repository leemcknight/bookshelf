import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useEffect } from 'react';
import { useAddBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from './errorView';
import { Auth } from "aws-amplify";
const { v4 } = require('uuid');

function AddBookshelfModal(props) {
    const [addBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookshelfMutation();

    const handleAddBookshelf = async e => {
        e.stopPropagation();
        e.preventDefault();
        const bookshelf = {
            id: v4(),
            name: e.target.name.value,
            notes: e.target.notes.value
        }

        addBookshelf(bookshelf);
    }

    useEffect(() => {
        if (isSuccess) {
            props.bookshelfAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Add a book to your library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isError && <ErrorView error={error} />}
                <Form onSubmit={handleAddBookshelf}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Bookshelf Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" placeholder="Notes" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Bookshelf
                        {isLoading && <Spinner animation='border' variant='light' size='sm' />}
                    </Button>
                    <Button variant="primary" type="cancel" >
                        Cancel
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBookshelfModal