import { ButtonGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function UserMenu() {

    const currentUser = useSelector(state => state.currentUser);
    const navigate = useNavigate();

    return (
        <ButtonGroup vertical>
            {!currentUser && <Button onClick={() => navigate('/login')} variant='light'>Login</Button>}
            {!currentUser && <Button onClick={() => navigate('/signup')} variant='light'>Sign Up</Button>}
            {currentUser && <Button onClick={() => navigate('/user/profile')} variant='light'>Profile</Button>}
            {currentUser && <Button onClick={() => navigate('/user/settings')} variant='light'>Account Settings</Button>}
            {currentUser && <Button variant='light'>Logout</Button>}

        </ButtonGroup>
    );

}

export default UserMenu;
