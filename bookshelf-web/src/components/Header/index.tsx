import { Navbar, Nav, NavDropdown, Button, OverlayTrigger, Popover, Form, ButtonGroup, Spinner, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faSlidersH, faUserAlt, faUserCircle, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from "../../services/BookshelfApi";
import * as React from 'react';
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";
import { Auth } from "aws-amplify";
import Login from "../../pages/login";

function Header(): JSX.Element {

    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.userSession);
    const skip = currentUser ?? true;
    const { data: profile } = useGetUserProfileQuery({ skip });

    function signOut() {
        Auth.signOut().then(() => navigate('/'))
    }

    function userTitle(): JSX.Element {
        if (profile) {
            return (<><FontAwesomeIcon icon={faUserCircle} /> {profile.displayName} </>)
        }
        return (<><FontAwesomeIcon icon={faUserCircle} /> Login</>)
    }
    return (
        <Navbar className='mb-3'>
            <Navbar.Brand className="mx-3" href="/">
                <img
                    src="/bookshelf.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Bookshelf logo"
                />Bookshelf
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/library">My Library</Nav.Link>
                </Nav>
                <Nav className="justify-content-end ml-3">
                    <Form className="d-flex">
                        <Form.Group controlId="search">
                            <Form.Control size="sm" type="text" placeholder="Search books" />
                        </Form.Group>
                    </Form>
                    {profile ? (
                        <NavDropdown id="user" className="justify-content-end" title={<><FontAwesomeIcon icon={faUserCircle} /> {profile.displayName} </>}>
                            <NavDropdown.Item onClick={() => navigate('/user/profile')}><FontAwesomeIcon className='ml-3' icon={faUserEdit} /> Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/user/settings')}><FontAwesomeIcon className='ml-3' icon={faSlidersH} /> Account Settings</NavDropdown.Item>
                            <NavDropdown.Item onClick={signOut}><FontAwesomeIcon className='ml-3' icon={faSignOutAlt} /> Signout</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.ItemText>
                                <NavDropdown.Header>
                                    Signed in as: {profile.email}
                                </NavDropdown.Header>
                            </NavDropdown.ItemText>
                        </NavDropdown>
                    ) : (
                        <NavDropdown title="Login">
                            <Login />
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => navigate('/signup')}><FontAwesomeIcon className='ml-3' icon={faUserPlus} />Sign Up</NavDropdown.Item>
                        </NavDropdown>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
