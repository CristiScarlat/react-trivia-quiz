import React from 'react';
import UI_TEXT from '../../constants';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">{UI_TEXT.headerTitle}</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://opentdb.com/api_config.php">{UI_TEXT.openTriviaApiMessage}</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default Header;