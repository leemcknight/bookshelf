import { Navbar, Nav, NavDropdown, Button, OverlayTrigger, Popover, Container, Row,  Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import BookshelfLogin from "./bookshelfLogin";
import UserMenu from '../userMenu';

function BookshelfHeader(props) {
    const {user} = props;
    const loginPopover = (
      <Popover id="popover-basic">        
        <Popover.Content>
            <BookshelfLogin loginCallback={props.loginCallback} />      
        </Popover.Content>
      </Popover>
    );

    const userPopover = (
      <Popover id="popover-basic">        
        <Popover.Content>
            <UserMenu />
        </Popover.Content>
      </Popover>
    );

    return(
      <Navbar bg='light' className='mb-3 shadow'>
      <Navbar.Brand href="#home">
          <img
              src="/bookshelf.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Bookshelf logo"
          />Bookshelf.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>  
          { user ? 
          <OverlayTrigger trigger="click" placement="bottom" overlay={userPopover}>
            <Button>{user.firstName + ' ' + user.lastName}<FontAwesomeIcon className='ml-3' icon={faUserAlt} /></Button>
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
