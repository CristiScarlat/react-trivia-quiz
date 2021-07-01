import React, { useContext } from 'react';
import UI_TEXT from '../../constants';
import { Navbar, Nav } from 'react-bootstrap';
import { StoreContext } from '../../context/store';

function Header() {
  const {globalState, dispatch} = useContext(StoreContext)

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/">{UI_TEXT.headerTitle}</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="https://opentdb.com/api_config.php">{UI_TEXT.openTriviaApiMessage}</Nav.Link>
      </Nav>
      {globalState.name !== '' && <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Welcome: <span>{globalState.name}</span>
        </Navbar.Text>
      </Navbar.Collapse>}
    </Navbar >
  )
}

export default Header;