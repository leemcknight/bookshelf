import { Navbar, Nav, NavDropdown, Button, OverlayTrigger, Popover, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import BookshelfLogin from "./bookshelfLogin";
import UserMenu from '../userMenu';

function BookshelfHeader(props) {
  var loginPopover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <BookshelfLogin />
      </Popover.Content>
    </Popover>
  );

  var userPopover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <UserMenu />
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


        {props && props.apiContext && props.apiContext.user ?
          <OverlayTrigger trigger="click" placement="bottom" overlay={userPopover}>
            <Button>{props.apiContext.user.given_name + ' ' + props.apiContext.user.family_name}<FontAwesomeIcon className='ml-3' icon={faUserAlt} /></Button>
          </OverlayTrigger> :
          <OverlayTrigger trigger="click" placement="bottom" overlay={loginPopover}>
            <Button>Login<FontAwesomeIcon className='ml-3' icon={faUserAlt} /></Button>
          </OverlayTrigger>
        }

      </Navbar.Collapse>
    </Navbar>
  );
}

export default BookshelfHeader;
