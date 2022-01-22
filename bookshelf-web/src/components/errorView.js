import { Container, Row, Col, Button, Form, Spinner, Alert, Accordion } from 'react-bootstrap';
const { useState, useEffect } = require("react")

function ErrorView(props) {
    const [error, setError] = useState();

    useEffect(() => {
        if (props.error) {
            console.log('setting error');
            console.log(props.error.stack);
            if (props.error.message) {
                setError(props.error);
            } else {
                setError({ message: JSON.stringify(props.error) });
            }
        } else {
            console.log('clearing error');
            setError(null);
        }
    }, [props.error])

    if (error) {
        return (
            <Container>
                <Row>
                    <Col><Accordion variant='danger'>
                        <Accordion.Item>
                            {error.message}
                        </Accordion.Item>
                    </Accordion></Col>
                </Row>
            </Container>
        )
    } else {
        return <div />
    }
}

export default ErrorView;