import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddBookModal from "./addBookModal";

function Home(props) {

    const [showAddBookModal, setShowsAddBookModal] = useState(false);


    const bookAddedCallback = async (bookshelf, book) => {

    }

    function handleAddBook(bookshelf) {
        setShowsAddBookModal(true);
    }

    function handleAddBookshelf() {

    }

    return (
        <Container>
            <Row>
                <Col>My Bookshelves</Col>
                <Col>
                    <Button onClick={handleAddBook}>Add Book</Button>
                </Col>
            </Row>
            {props.library && props.library.bookshelves &&
                props.library.bookshelves.map(b => {
                    <Row>
                        <Col>{b.name}</Col>
                        <Col>{b.bookCount}</Col>
                    </Row>
                })
            }
            <AddBookModal show={showAddBookModal} bookAddedCallback={bookAddedCallback} />
        </Container>
    );
}

export default withRouter(Home);