import { Form, Container, Row, Col, Button } from "react-bootstrap";
import UserManager from '../util/userManager';
import {withRouter} from 'react-router-dom';
import {useState} from 'react';

function VerifyEmail(props) {
    const  {busy, setBusy} = useState();
    function verify(event) {
        event.stopPropagation();
        event.preventDefault();

        const code = event.target.code.value;
        setBusy(true);
        const response = await UserManager.confirmAccount(props.account.userName, code);
        setBusy(false);
    }
    
    return(
        <Container>
            {props.account && 
            <Row>
                <Col>We have sent a confirmation email to {props.account.userName}.  Please enter the confirmation code attached.
                </Col>
            </Row>
}
            <Row>
                <Form onSubmit={verify}>
                    <Form.Control type='input' placeholder='Confirmation Code' id='code' />
                    <Button type='submit' disabled={busy}>Verify {busy && <Spinner animation='border' size='sm' /></Button>
                </Form>
            </Row>
        </Container>
    );
}

export default withRouter(VerifyEmail);