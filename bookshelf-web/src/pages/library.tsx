import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Table, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as React from 'react';
import AddBookshelfModal from "../components/addBookshelfModal";
import { useGetLibraryQuery } from "../services/BookshelfApi";
import ErrorView from "../components/ErrorView";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faChevronRight, faPlug, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Library() {
    const navigate = useNavigate();
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
            const session = (await Auth.currentSession()).getAccessToken();
            setIsLoggedIn(session != null);
        }
        checkLogin();
    }, [])

    return (

        <Container>
            {isError && <ErrorView error={error} />}
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <FontAwesomeIcon icon={faBook} /> My Bookshelves
                                </Col>
                                <Col className="text-end">
                                    <Button size="sm" variant="context" onClick={handleAddBookshelf}><FontAwesomeIcon icon={faPlus} /></Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Title>

                    <Table borderless size="sm" striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Notes</th>
                                <th>Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching && <tr><td colSpan={3} align="center"><Spinner animation="border" variant="success" /></td> </tr>}
                            {isSuccess && library.map(shelf => (
                                <tr key={shelf.id}>
                                    <td><Button size="sm" onClick={() => navigate(`/library/bookshelf/${shelf.id}`)}>{shelf.name} <FontAwesomeIcon icon={faChevronRight} /> </Button></td>
                                    <td>{shelf.notes}</td>
                                    <td>{shelf.bookCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
            <AddBookshelfModal show={showAddBookshelfModal} onCanceled={() => setShowsAddBookshelfModal(false)} bookshelfAddedCallback={bookshelfAddedCallback} />
        </Container>

    );
}
