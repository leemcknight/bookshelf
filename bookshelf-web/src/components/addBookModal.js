const api = require('../util/apiManager');

function addBookModal(props) {
    const [busy, setBusy] = useState(false);

    const handleAddBook = () => {
        const book = {
            title: '',
            author: '',
            isbn: ''
        }
        setBusy(true);
        const response = await api.addBookToLibrary(book, props.apiContext);

        setBusy(false)        
    }

    return (
    <Modal show={show}>
        <Modal.Header>
            <Modal.Title>Add a book to your library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col>Title</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Author</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>ISBN</Col>
                    <Col></Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleAddBook}>Add Book</Button>
        </Modal.Footer>
    </Modal>
    ); 
}
