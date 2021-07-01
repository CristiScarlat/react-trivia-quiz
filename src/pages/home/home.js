import React, { useState } from 'react';
import UI_TEXT from '../../constants';
import { Button } from 'react-bootstrap';
import Header from '../../modules/header/header';
import Footer from '../../modules/footer/footer';
import TextInput from '../../components/input/textInput';
import './home.css'

function Home() {
    const [name, setName] = useState('')
    
    const handleInputName = (e) => {
        setName(e.target.value)
    }

    return (
        <>
        <Header />
        <div className="home-body-container">
            <div className="welcome-message m-4">{UI_TEXT.welcomeMessage}</div>
            <TextInput className="m-4" type="text" value={name} placeholder="Input your name" onChange={handleInputName}/>
            <Button varinat="primary">Start</Button>
        </div>
        <Footer />
        </>
    )
}

export default Home;