import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useEffect } from 'react';
import * as React from "react";
import { useAddBookToBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from "./ErrorView";
import SubmitButton from './SubmitButton';
import { TBook } from '../types';

type TWorkingState = {
    show: boolean,
    bookshelfId: string,
    bookAddedCallback: () => void,
    onCanceled: () => void,
}

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement,
    author: HTMLInputElement,
    isbn: HTMLInputElement
}

interface BookFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function AddBookModal({ show, bookshelfId, bookAddedCallback, onCanceled }: TWorkingState): JSX.Element {
    const [addBookToBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookToBookshelfMutation();

    const handleAddBook = async (e: React.FormEvent<BookFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const elements = e.currentTarget.elements
        const book = {
            title: elements.title.value,
            author: elements.author.value,
            isbn: elements.isbn.value
        } as TBook;

        const params = {
            bookshelfId,
            book
        }
        addBookToBookshelf(params);
    }

    useEffect(() => {
        if (isSuccess) {
            bookAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={show} centered onHide={onCanceled}>
            <Modal.Header closeButton closeVariant="">
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
                    <Col className="float-end"><Button type="submit">Add Book</Button> </Col>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBookModal