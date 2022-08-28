// @flow

import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as React from 'react';
import AddBookshelfModal from "../components/addBookshelfModal";
import { useGetLibraryQuery } from "../services/BookshelfApi";
import ErrorView from "../components/ErrorView";
import { Auth } from "aws-amplify";
import { TBookshelf } from "../types";

function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAddBookshelfModal, setShowsAddBookshelfModal] = useState(false);
    const {
        data: library,
        isFetching,
        isError,
        error,
        isSuccess
    } = useGetLibraryQuery({ skip: !isLoggedIn });

    function handleAddBookshelf() {
        setShowsAddBookshelfModal(true);
    }

    const bookshelfAddedCallback = async () => {
        setShowsAddBookshelfModal(false);
    }

    useEffect(() => {
        async function checkLogin() {
            const session = await (await Auth.currentSession()).getAccessToken();
            setIsLoggedIn(session != null);
        }
        checkLogin();
    }, [])

    return (
        <Container>
            {isFetching && <Spinner animation="border" variant="success" size="sm" />}
            {isError && <ErrorView error={error} />}
            <Row>
                <Col className="text-left">My Bookshelves</Col>
                <Col>
                    <Button onClick={handleAddBookshelf}>Add Bookshelf</Button>
                </Col>
            </Row>
            {isSuccess &&
                library.map((b: TBookshelf) => (
                    <Row key={b.id}>
                        <Col className="text-left"><Link to={`/library/bookshelf/${b.id}`}>{b.name}</Link></Col>
                        <Col>{b.bookCount}</Col>
                    </Row>
                ))
            }
            <AddBookshelfModal show={showAddBookshelfModal} bookshelfAddedCallback={bookshelfAddedCallback} />
        </Container>
    );
}

export default Home;