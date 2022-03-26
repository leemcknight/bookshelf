import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ErrorView from './errorView';
import AddBookModal from './addBookModal';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../services/BookshelfApi';

function BookshelfView() {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { bookshelfId } = useParams();
    const { data: bookshelf, isFetching, isSuccess, isError, error } = useGetBooksQuery(bookshelfId, { skip: !isLoggedIn });


    const handleAddBook = async () => {
        setShowAddBookModal(true);
    }

    const bookAddedCallback = async book => {
        showAddBookModal(false);
    }

    useEffect(() => {
        async function checkLogin() {
            const token = await (await Auth.currentSession()).getAccessToken();
            setIsLoggedIn(token);
        }
        checkLogin();
    }, [])

    return (
        <Container>
            {isFetching && <Spinner animation="border" variant="success" size="lg" />}
            {isError && <ErrorView error={error} />}


            <Row><Col><Button onClick={handleAddBook}>Add Book</Button></Col></Row>
            {isSuccess &&
                bookshelf.results.Items.map(book => (
                    <Row>
                        <Col>{book.author}</Col>
                        <Col>{book.title}</Col>
                        <Col>{book.rating}</Col>
                    </Row>
                ))
            }
            <AddBookModal show={showAddBookModal} bookAddedCallback={bookAddedCallback} bookshelfId={bookshelfId} />
        </Container >
    )
}

export default BookshelfView;