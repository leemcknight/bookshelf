import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useEffect } from 'react';
import { useAddBookToBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from "./errorView";


function AddBookModal(props) {


    const [addBookToBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookToBookshelfMutation();

    const handleAddBook = async e => {
        e.stopPropagation();
        e.preventDefault();


        const book = {
            title: e.target.title.value,
            author: e.target.author.value,
            isbn: e.target.isbn.value
        }

        const bookshelfId = props.bookshelfId;
        addBookToBookshelf({ bookshelfId, ...book });
    }

    useEffect(() => {
        if (isSuccess) {
            props.bookAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Add a book to your library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isError && <ErrorView error={error} />}
                <Form onSubmit={handleAddBook}>
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

                    <Button variant="primary" type="submit">
                        Add Book
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

export default AddBookModal