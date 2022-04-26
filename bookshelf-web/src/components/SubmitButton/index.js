import { Button, Spinner } from "react-bootstrap";

function SubmitButton(props) {
    const title = props.title ? props.title : "Submit"
    return (
        <Button variant="primary" className='mb-3' type="submit" disabled={props.isLoading}>
            {title}
            {props.isLoading && <Spinner animation='border' className="ml-3" variant='light' size='sm' />}
        </Button>
    )
}

export default SubmitButton;