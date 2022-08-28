
// @flow

import { Button, Spinner } from "react-bootstrap";
import * as React from 'react';

type TWorkingState = {
    title: string,
    isLoading: boolean
}

export default function SubmitButton({ isLoading, title }: TWorkingState): JSX.Element {
    return (
        <Button variant="primary" className='mb-3' type="submit" disabled={isLoading}>
            {title ? title : "Submit"}
            {isLoading && <Spinner animation='border' className="ml-3" variant='light' size='sm' />}
        </Button>
    )
}