import React, { useContext, useState } from 'react';
import UI_TEXT from '../../constants';
import { Button } from 'react-bootstrap';
import Header from '../../modules/header/header';
import Footer from '../../modules/footer/footer';
import TextInput from '../../components/input/textInput';
import './home.css'
import { StoreContext } from '../../context/store';

function Home() {
    const [name, setName] = useState('')
    const {globalState, dispatch} = useContext(StoreContext)
    
    const handleInputName = (e) => {
        setName(e.target.value)
    }

    const handleStart = () => {
        dispatch({type: 'SET_NAME', name: name})
        dispatch({type: 'HANDLE_MODAL', modal:{
            show: true,
            title: 'Hi!!!',
            body:  `Hi ${name}, do you want to continue?`
          }})
    }

    return (
        <>
        <Header />
        <div className="home-body-container">
            <div className="welcome-message m-4">{UI_TEXT.welcomeMessage}</div>
            <TextInput className="m-4" type="text" value={name} placeholder="Input your name" onChange={handleInputName}/>
            <Button varinat="primary" onClick={handleStart} disabled={name === ''}>Start</Button>
        </div>
        <Footer />
        </>
    )
}

export default Home;