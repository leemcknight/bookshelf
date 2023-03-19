import { Button, Col, Form, Modal } from "react-bootstrap";
import React, { useEffect } from 'react';
import { useAddBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from './ErrorView';
import SubmitButton from './SubmitButton';
import { TBookshelf } from "../types";
import { v4 } from 'uuid';

type TWorkingState = {
    bookshelfAddedCallback: () => void,
    show: boolean,
    onCanceled: () => void,
}

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement,
    notes: HTMLInputElement
}

interface BookshelfFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function AddBookshelfModal({ bookshelfAddedCallback, show, onCanceled }: TWorkingState): JSX.Element {
    const [addBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookshelfMutation();

    const handleAddBookshelf = async (e: React.FormEvent<BookshelfFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const elements = e.currentTarget.elements
        const bookshelf = {
            id: v4(),
            name: elements.name.value,
            notes: elements.notes.value
        } as TBookshelf

        addBookshelf(bookshelf);
    }

    useEffect(() => {
        if (isSuccess) {
            bookshelfAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={show} onHide={onCanceled}>
            <Modal.Header closeButton>
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
                    <Col className="float-right">
                        <Button type="submit" title="Add Bookshelf">Add Bookshelf</Button>
                    </Col>
                </Form>
            </Modal.Body>
        </Modal>
    );
}