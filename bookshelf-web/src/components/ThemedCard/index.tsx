import { Card } from "react-bootstrap";


type TProps = {
    title: string
    children?: any
    icon?: any
}
export function ThemedCard({ title, children, icon }: TProps): JSX.Element {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{icon && icon}{title}</Card.Title>
                {children && children}
            </Card.Body>
        </Card>
    )
}