// @flow

import { Container, Row, Col, Button, Spinner, Table } from 'react-bootstrap';
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

            {isError && <ErrorView error={error} />}

            <Row><Col><Button onClick={handleAddBook}>Add Book</Button></Col></Row>
            <Row>
                <Table borderless className='justify-content-start'>
                    <thead><tr><th>ISBN</th><th>Author</th><th>Title</th><th>Rating</th></tr></thead>
                    <tbody>
                        {isSuccess && bookshelf.books.map(book => (
                            <tr>
                                <td>{book.isbn}</td>
                                <td>{book.author}</td>
                                <td>{book.title}</td>
                                <td>{book.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            {isFetching && <Spinner animation="border" variant="success" size="sm" />}
            <AddBookModal show={showAddBookModal} bookAddedCallback={bookAddedCallback} bookshelfId={bookshelfId!} />
        </Container >
    )
}