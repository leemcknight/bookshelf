import { Container, Row, Col, Button } from 'react-bootstrap';

function BookshelfView(props) {
    const library = props.library;
    return (
        <Container>
            <Row><Col><Button>Add Book</Button></Col></Row>
            {
                library.books.map(book => (
                    <Row>
                        <Col>{book.author}</Col>
                        <Col>{book.title}</Col>
                        <Col>{book.rating}</Col>
                    </Row>
                ))
            }

        </Container >
    )
}

export default BookshelfView;