// @flow

import { Container, Row, Col, Alert } from 'react-bootstrap';
import * as React from 'react';

type TWorkingState = {
    message: string
}

function SuccessView({ message }: TWorkingState): JSX.Element {
    return (
        <Container>
            <Row>
                <Col><Alert variant='primary'>{message}</Alert></Col>
            </Row>
        </Container>
    )
}

export default SuccessView;