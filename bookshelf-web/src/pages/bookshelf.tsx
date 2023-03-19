import { Container, Row, Col, Button, Spinner, Table, Card } from 'react-bootstrap';
import { useState } from 'react';
import * as React from "react";
import ErrorView from '../components/ErrorView';
import AddBookModal from '../components/addBookModal';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../services/BookshelfApi';
import { TBook } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                Books
                            </Col>
                            <Col className="text-end">
                                <Button size="sm" onClick={handleAddBook}><FontAwesomeIcon icon={faPlus} /> </Button>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Table borderless striped size="sm">
                        <thead><tr><th>ISBN</th><th>Author</th><th>Title</th><th>Rating</th></tr></thead>
                        <tbody>
                            {isSuccess && bookshelf.books.map(book => (
                                <tr key={book.isbn}>
                                    <td>{book.isbn}</td>
                                    <td>{book.author}</td>
                                    <td>{book.title}</td>
                                    <td>{book.rating}</td>
                                </tr>
                            ))}
                            {isFetching && <tr><td colSpan={4} align="center"><Spinner animation="border" /></td></tr>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <AddBookModal onCanceled={() => setShowAddBookModal(false)} show={showAddBookModal} bookAddedCallback={bookAddedCallback} bookshelfId={bookshelfId!} />
        </Container >
    )
}