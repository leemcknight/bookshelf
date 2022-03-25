import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddBookshelfModal from "./addBookshelfModal";
import { useGetLibraryQuery } from "../services/BookshelfApi";
import ErrorView from "./errorView";
import { Auth } from "aws-amplify";

function Home(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cognitoId, setCognitoId] = useState();
    const [showAddBookshelfModal, setShowsAddBookshelfModal] = useState(false);
    const {
        data: library,
        isFetching,
        isError,
        error,
        isSuccess
    } = useGetLibraryQuery(cognitoId, { skip: !isLoggedIn });

    function handleAddBookshelf() {
        setShowsAddBookshelfModal(true);
    }

    const bookshelfAddedCallback = async bookshelf => {
        setShowsAddBookshelfModal(false);
    }

    useEffect(() => {
        async function checkLogin() {
            const session = await (await Auth.currentSession()).getAccessToken();
            setIsLoggedIn(session);
            setCognitoId(session.payload.sub);
        }
        checkLogin();
    }, [])

    return (
        <Container>
            {isFetching && <Spinner animation="border" variant="success" size="lg" />}
            {isError && <ErrorView error={error} />}
            <Row>
                <Col>My Bookshelves</Col>
                <Col>
                    <Button onClick={handleAddBookshelf}>Add Bookshelf</Button>
                </Col>
            </Row>
            {isSuccess &&
                library.results.Items.map(b => (
                    <Row>
                        <Col><Link to="/">{b.name}</Link></Col>
                        <Col>{b.bookCount}</Col>
                    </Row>
                ))
            }
            <AddBookshelfModal show={showAddBookshelfModal} bookshelfAddedCallback={bookshelfAddedCallback} />
        </Container>
    );
}

export default Home;