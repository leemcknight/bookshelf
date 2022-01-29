import { ButtonGroup, Button } from "react-bootstrap";


function UserMenu() {
    return (
        <ButtonGroup vertical>
            <Button variant='light'>Profile</Button>
            <Button variant='light'>Account Settings</Button>
            <Button variant='light'>Logout</Button>
        </ButtonGroup>
    );

}

export default UserMenu;
