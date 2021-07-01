import React from 'react';
import UI_TEXT from '../../constants';
import { Button } from 'react-bootstrap';
import Header from '../../modules/header/header';

function Home() {
    return (
        <>
        <Header />
        <div>
            <div>{UI_TEXT.welcomeMessage}</div>
            <input type="text" />
            <Button varinat="primary">Start</Button>
        </div>
        </>
    )
}

export default Home;