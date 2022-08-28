// @flow

import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import * as React from "react";
import ErrorView from '../components/ErrorView';
import AddBookModal from '../components/addBookModal';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../services/BookshelfApi';
import { TBook } from '../types';

export default function Bookshelf(): JSX.Element {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { bookshelfId } = useParams<{ bookshelfId: string }>();
    const {
        data: bookshelf,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery(bookshelfId!, { skip: !isLoggedIn });


    const handleAddBook = async () => {
        setShowAddBookModal(true);
    }

    const bookAddedCallback = () => {
        setShowAddBookModal(false);
    }

    useEffect(() => {
        async function checkLogin() {
            const token = (await Auth.currentSession()).getAccessToken();
            setIsLoggedIn(token != null);
        }
        checkLogin();
    }, [])

    return (
        <Container>
            {isFetching && <Spinner animation="border" variant="success" size="sm" />}
            {isError && <ErrorView error={error} />}

            <Row><Col><Button onClick={handleAddBook}>Add Book</Button></Col></Row>
            {isSuccess &&
                bookshelf.books.map((book: TBook) => (
                    <Row key={book.isbn}>
                        <Col>{book.author}</Col>
                        <Col>{book.title}</Col>
                        <Col>{book.rating}</Col>
                    </Row>
                ))
            }
            <AddBookModal show={showAddBookModal} bookAddedCallback={bookAddedCallback} bookshelfId={bookshelfId!} />
        </Container >
    )
}