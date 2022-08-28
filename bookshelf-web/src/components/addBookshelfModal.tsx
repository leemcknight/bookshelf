// @flow

import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect } from 'react';
import { useAddBookshelfMutation } from "../services/BookshelfApi";
import ErrorView from './ErrorView';
import SubmitButton from './SubmitButton';
import { TBookshelf } from "../types";
const { v4 } = require('uuid');

type TWorkingState = {
    bookshelfAddedCallback: () => void,
    show: boolean,
}

interface FormElements extends HTMLFormControlsCollection {
    name: string,
    notes: string
}

interface BookshelfFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function AddBookshelfModal({ bookshelfAddedCallback, show }: TWorkingState): JSX.Element {
    const [addBookshelf, { isLoading, error, isSuccess, isError }] = useAddBookshelfMutation();

    const handleAddBookshelf = async (e: React.FormEvent<BookshelfFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const bookshelf = {
            id: v4(),
            name: e.currentTarget.name,
            notes: e.currentTarget.notes
        } as TBookshelf

        addBookshelf(bookshelf);
    }

    useEffect(() => {
        if (isSuccess) {
            bookshelfAddedCallback();
        }
    }, [isSuccess])

    return (
        <Modal show={show}>
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
                    <SubmitButton title="Add Bookshelf" isLoading={isLoading} />
                    <Button variant="primary" type="cancel" >
                        Cancel
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}