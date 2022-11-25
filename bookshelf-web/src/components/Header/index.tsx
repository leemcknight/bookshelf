import { Navbar, Nav, NavDropdown, Button, OverlayTrigger, Popover, Form, ButtonGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSlidersH, faUserAlt, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from "../../services/BookshelfApi";
import * as React from 'react';
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";

function Header(): JSX.Element {

    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.userSession);
    const skip = currentUser ?? true;
    const { data: profile, isFetching } = useGetUserProfileQuery({ skip });

    var userPopover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <ButtonGroup vertical>
                    {skip && <Button onClick={() => navigate('/login')} variant='light'><FontAwesomeIcon className='ml-3' color="green" icon={faSignInAlt} />Login</Button>}
                    {skip && <Button onClick={() => navigate('/signup')} variant='light'><FontAwesomeIcon className='ml-3' color="grey" icon={faUserPlus} />Sign Up</Button>}
                    {!skip && <Button onClick={() => navigate('/user/profile')} variant='light'><FontAwesomeIcon className='ml-3' icon={faUserEdit} />Profile</Button>}
                    {!skip && <Button onClick={() => navigate('/user/settings')} variant='light'><FontAwesomeIcon className='ml-3' icon={faSlidersH} />Account Settings</Button>}
                    {!skip && <Button variant='light'>Logout</Button>}
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    );

    return (
        <Navbar bg='light' className='mb-3 shadow'>
            <Navbar.Brand href="#home">
                <img
                    src="/bookshelf.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Bookshelf logo"
                />Bookshelf.com
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/home">My Library</Nav.Link>
                    <Nav.Link href="#link">Browse</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item><Link to='/home'>My Library</Link></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="mr-auto">
                    <Form className="d-flex">
                        <Form.Group controlId="search">
                            <Form.Control type="text" placeholder="Search books" />
                        </Form.Group>
                    </Form>
                </Nav>

                {profile ?
                    <OverlayTrigger trigger="focus" placement="bottom" overlay={userPopover}>
                        <Button><FontAwesomeIcon className='mr-3' icon={faUserAlt} />{profile.displayName}</Button>
                    </OverlayTrigger>
                    :
                    <OverlayTrigger trigger="focus" placement="bottom" overlay={userPopover}>
                        <Button>Login<FontAwesomeIcon className='ml-3' icon={faUserAlt} />
                            {isFetching && <Spinner animation="border" className='ml-2' variant="success" size="sm" />}
                        </Button>
                    </OverlayTrigger>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
