import React from 'react';
import UI_TEXT from '../../constants';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGithub , faLinkedin} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom">
        <Nav className="mr-auto">
          <Nav.Link href="https://github.com/CristiScarlat/react-trivia-quiz"><FontAwesomeIcon icon={faGithub} size="2x"/></Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/cristian-scarlat-6839a942"><FontAwesomeIcon icon={faLinkedin} size="2x"/></Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default Footer;