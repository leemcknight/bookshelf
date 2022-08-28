// @flow

import { Button, Form, Modal } from "react-bootstrap";
import { useEffect } from 'react';
import * as React from "react";
import { useAddBookToBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from "./ErrorView";
import SubmitButton from './SubmitButton';
import { TBook } from '../types';

type TWorkingState = {
    show: boolean,
    bookshelfId: string,
    bookAddedCallback: () => void
}

interface FormElements extends HTMLFormControlsCollection {
    title: string,
    author: string,
    isbn: string
}

interface BookFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function AddBookModal({ show, bookshelfId, bookAddedCallback }: TWorkingState): JSX.Element {
    const [addBookToBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookToBookshelfMutation();

    const handleAddBook = async (e: React.FormEvent<BookFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const book = {
            title: e.currentTarget.title,
            author: e.currentTarget.author,
            isbn: e.currentTarget.isbn
        } as TBook;

        addBookToBookshelf({ bookshelfId, book });
    }

    useEffect(() => {
        if (isSuccess) {
            bookAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={show}>
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
                    <SubmitButton title="Add Book" isLoading={isLoading} />
                    <Button variant="primary" type="cancel" >
                        Cancel
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBookModal