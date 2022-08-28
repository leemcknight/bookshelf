
// @flow

import * as React from 'react';
import { Form } from 'react-bootstrap';

type TWorkingState = {
    handlerFunction: (event: any) => void,
    children: any
}

export default function FormHandler<T>({ handlerFunction, children }: TWorkingState): JSX.Element {

    interface FormElements extends HTMLFormControlsCollection {
        name: string,
        notes: string
    }

    interface BookshelfFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const data = e.currentTarget;
        handlerFunction(data);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {children}
        </Form>
    )
}