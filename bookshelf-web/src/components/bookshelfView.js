import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ErrorView from './errorView';
import AddBookModal from './addBookModal';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

const { api, useGetBooksQuery } = require('../util/apiManager');

function BookshelfView(props) {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: bookshelf, isFetching, isSuccess, isError, error } = useGetBooksQuery(props.bookshelfId, { skip: !isLoggedIn });

    const handleAddBook = async () => {
        setShowAddBookModal(true);
    }

    const bookAddedCallback = async book => {
        const response = await api.addBookToBookshelf(bookshelf.id, book);
        return response;
    }

    useEffect(() => {
        async function checkLogin() {
            const user = await Auth.currentAuthenticatedUser();
            setIsLoggedIn(user);
        }
        checkLogin();
    }, [])

    return (
        <Container>
            {isFetching && <Spinner animation="border" variant="success" size="lg" />}
            {isError && <ErrorView error={error} />}


            <Row><Col><Button onClick={handleAddBook}>Add Book</Button></Col></Row>
            {isSuccess &&
                bookshelf.books.map(book => (
                    <Row>
                        <Col>{book.author}</Col>
                        <Col>{book.title}</Col>
                        <Col>{book.rating}</Col>
                    </Row>
                ))
            }
            <AddBookModal show={showAddBookModal} bookAddedCallback={bookAddedCallback} />
        </Container >
    )
}

export default BookshelfView;