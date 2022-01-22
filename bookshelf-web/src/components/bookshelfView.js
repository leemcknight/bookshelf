import {Form, Container, Row, Col, Button, Jumbotron, Alert} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
const userManager = require('../util/userManager');
const {useState} = require('react');

function BookshelfView(props) {
    const bookshelf = props.bookshelf;
    return (
        <Container>
        { bookshelf.books.map(book => (
            <Row>
                <Col>{book.author}</Col>
                <Col>{book.title}</Col>
                <Col>{book.rating}</Col>
            </Row> 
        ))}
        </Container>
    )
}

export default BookshelfView;